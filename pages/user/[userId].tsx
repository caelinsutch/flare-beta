import React, { useEffect, useState } from "react";
import { PageContainer, ReviewCard } from "../../src/Components";
import { User } from "../../src/Models/User";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Link,
  ListItem,
  OrderedList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { GetStaticPaths, GetStaticProps } from "next";
import { getUser, getUsers } from "../../src/Api/Handlers/user";
import { SubmitReviewModal } from "../../src/PageComponents";
import { useGetUser } from "../../src/Hooks/user";
import { useRouter } from "next/router";

export const getStaticProps: GetStaticProps<any, { userId: string }> = async ({
  params,
}) => {
  const { user } = await getUser(params?.userId as string);

  return {
    props: {
      user,
    },
  };
};

export const getStaticPaths: GetStaticPaths<{ userId: string }> = async () => {
  const { users } = await getUsers();
  return {
    paths: users.map((u) => ({ params: { userId: u.userId } })),
    fallback: "blocking",
  };
};

type UserPageProps = {
  user?: User;
};

const UserPage: React.FC<UserPageProps> = ({ user: initialUser }) => {
  const router = useRouter();
  const { getUser } = useGetUser();

  const [user, setUser] = useState<User>(initialUser);

  useEffect(() => {
    if (!user) {
      const { partyId } = router.query;

      getUser(partyId as string).then((user) => user && setUser(user));
    }
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleReviewSubmitted = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <PageContainer p={4}>
      {user && (
        <Container>
          <Box>
            <Text variant="title1">{user.name}</Text>
            <Text variant="title3" mt={2}>
              {user.address}
            </Text>
            <Text variant="subtitle2" mt={2}>
              Flare partier since {dayjs(user.createdAt).format("MMM YYYY")}
            </Text>
            <Text mt={4}>{user?.bio}</Text>
            {user.attending?.length !== 0 && (
              <Box mt={4}>
                <Text variant="title3">Parties Attended</Text>
                <OrderedList stylePosition="inside" mt={2}>
                  {user.attending.map((party) => (
                    <ListItem key={party.partyId}>
                      <Link href={`/party/${party.partyId}`}>{party.name}</Link>
                    </ListItem>
                  ))}
                </OrderedList>
              </Box>
            )}
            {user.hosting?.length !== 0 && (
              <Box mt={4}>
                <Text variant="title3">Parties Hosted</Text>
                <OrderedList stylePosition="inside" mt={2}>
                  {user.hosting.map((party) => (
                    <ListItem key={party.partyId}>
                      <Link href={`/party/${party.partyId}`}>{party.name}</Link>
                    </ListItem>
                  ))}
                </OrderedList>
              </Box>
            )}
          </Box>
          <Divider my={4} />
          <SubmitReviewModal
            userId={user.userId}
            onReviewSubmitted={handleReviewSubmitted}
            isOpen={isOpen}
            onClose={onClose}
          />
          <Flex justifyContent="space-between" alignItems="center">
            <Text variant="title3">Reviews</Text>
            <Button colorScheme="orange" onClick={onOpen}>
              Submit Review
            </Button>
          </Flex>
          {user.reviews &&
            user.reviews.map((a) => (
              <ReviewCard review={a} key={a.body + a.createdAt} />
            ))}
        </Container>
      )}
    </PageContainer>
  );
};

export default UserPage;
