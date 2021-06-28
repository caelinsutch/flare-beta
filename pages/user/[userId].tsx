import React, { useEffect, useState } from "react";
import { PageContainer, ReviewCard } from "../../src/Components";
import { User } from "../../src/Models";
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
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { GetStaticPaths, GetStaticProps } from "next";
import { getUser, getUsers } from "../../src/Api/Handlers/user";
import { SubmitReviewModal } from "../../src/PageComponents";
import { useGetUser } from "../../src/Hooks/user";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUser } from "../../src/Redux";
import { userCollection } from "../../src/Api/Firebase/firestore";
import { useDeleteReview } from "../../src/Hooks/review";
import NextLink from "next/link";

export const getStaticProps: GetStaticProps<any, { userId: string }> = async ({
  params,
}) => {
  if (!params?.userId) {
    return {
      notFound: true,
    };
  }

  try {
    const userIdSnapshot = await userCollection.doc(params.userId).get();

    if (userIdSnapshot.exists) {
      const { user: idUser } = await getUser(params.userId);
      return {
        props: {
          user: idUser,
        },
        revalidate: 5,
      };
    } else {
      const s = await userCollection.where("url", "==", params.userId).get();

      if (s.docs.length > 0) {
        const d = s.docs[0].data();
        const { user } = await getUser(d.userId);

        return {
          props: {
            user,
          },
          revalidate: 5,
        };
      } else {
        return {
          notFound: true,
        };
      }
    }
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths<{ userId?: string }> = async () => {
  const { users } = await getUsers();
  const paths = [
    ...users.map((u) => ({
      params: { userId: u.userId },
    })),
    ...users.filter((u) => u.url).map((u) => ({ params: { userId: u.url } })),
  ];
  return {
    paths,
    fallback: "blocking",
  };
};

type UserPageProps = {
  user?: User;
};

const UserPage: React.FC<UserPageProps> = ({ user: initialUser }) => {
  const router = useRouter();
  const { getUser } = useGetUser();
  const { deleteReview } = useDeleteReview();
  const me = useSelector(selectUser);

  const [thisUser, setThisUser] = useState<User | undefined>(initialUser);

  const isUser = me?.userId === thisUser?.userId;

  useEffect(() => {
    if (!thisUser) {
      const { userId } = router.query;

      getUser(userId as string).then((user) => user && setThisUser(user));
    }
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleReviewSubmitted = (newUser: User) => {
    setThisUser(newUser);
  };

  const handleReviewDelete = async (reviewId: string) => {
    await deleteReview(reviewId);

    if (thisUser)
      await getUser(thisUser.userId).then((user) => user && setThisUser(user));
  };

  return (
    <PageContainer p={4}>
      {thisUser && (
        <Container>
          <Box>
            <Text variant="title1">{thisUser.name}</Text>
            <Text variant="title3" mt={2}>
              {thisUser.address}
            </Text>
            <Text variant="subtitle2" mt={2}>
              Flare partier since {dayjs(thisUser.createdAt).format("MMM YYYY")}
            </Text>
            <Text mt={4}>{thisUser?.bio}</Text>
            {thisUser.attending?.length !== 0 && (
              <Box mt={4}>
                <Text variant="title3">Parties Attended</Text>
                <OrderedList stylePosition="inside" mt={2}>
                  {thisUser.attending.map((party) => (
                    <ListItem key={party.partyId}>
                      <Link as={NextLink} href={`/party/${party.partyId}`}>
                        {party.name}
                      </Link>
                    </ListItem>
                  ))}
                </OrderedList>
              </Box>
            )}
            {thisUser.hosting?.length !== 0 && (
              <Box mt={4}>
                <Text variant="title3">Parties Hosted</Text>
                <UnorderedList mt={2}>
                  {thisUser.hosting.map((party) => (
                    <ListItem key={party.partyId}>
                      <Link as={NextLink} href={`/party/${party.partyId}`}>
                        {party.name}
                      </Link>
                    </ListItem>
                  ))}
                </UnorderedList>
              </Box>
            )}
          </Box>
          <Divider my={4} />
          {thisUser.host && (
            <>
              <SubmitReviewModal
                userId={thisUser.userId}
                onReviewSubmitted={handleReviewSubmitted}
                isOpen={isOpen}
                onClose={onClose}
              />
              <Flex justifyContent="space-between" alignItems="center">
                <Text variant="title3">Reviews</Text>
                <Button colorScheme="orange" onClick={onOpen}>
                  Submit Anonymous Review
                </Button>
              </Flex>
              {thisUser.reviews &&
                thisUser.reviews.map((a) => (
                  <ReviewCard
                    onDelete={
                      isUser ? () => handleReviewDelete(a.reviewId) : undefined
                    }
                    review={a}
                    key={a.body + a.createdAt}
                  />
                ))}
            </>
          )}
        </Container>
      )}
    </PageContainer>
  );
};

export default UserPage;
