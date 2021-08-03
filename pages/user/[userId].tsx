import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { GetStaticPaths, GetStaticProps } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { PageContainer, PartyCard, ReviewCard } from "@Components";
import { useGetUser, useDeleteReview } from "@Hooks";
import { Party, User } from "@Models";
import { SubmitUserReviewModal } from "@PageComponents";
import { selectUser } from "@Redux";

import { userCollection } from "@Api/Firebase";
import { getUser, getUsers } from "@Api/Handlers";

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
        revalidate: 1,
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
          revalidate: 1,
        };
      } else {
        return {
          notFound: true,
        };
      }
    }
  } catch (e) {
    console.error(e);
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
  const { getUser: getUserLocal } = useGetUser();
  const { deleteReview } = useDeleteReview();
  const me = useSelector(selectUser);

  const [thisUser, setThisUser] = useState<User | undefined>(initialUser);

  const isUser = me?.userId === thisUser?.userId;

  useEffect(() => {
    if (!thisUser) {
      const { userId } = router.query;

      getUserLocal(userId as string).then((user) => user && setThisUser(user));
    }
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleReviewSubmitted = (newUser: User) => {
    setThisUser(newUser);
  };

  const handleReviewDelete = async (reviewId: string) => {
    await deleteReview(reviewId);

    if (thisUser)
      await getUserLocal(thisUser.userId).then(
        (user) => user && setThisUser(user)
      );
  };

  return (
    <PageContainer title={`Plots - ${thisUser?.name}`}>
      {thisUser && (
        <Container>
          <Box>
            <Text variant="title1">{thisUser.name}</Text>
            <Text variant="title3" mt={2}>
              {thisUser.address}
            </Text>
            <Text variant="subtitle2" mt={2}>
              Plots partier since {dayjs(thisUser.createdAt).format("MMM YYYY")}
            </Text>
            <Text mt={4}>{thisUser?.bio}</Text>
            {thisUser.attending?.length !== 0 && (
              <Box mt={4}>
                <Text variant="title3" mb={2}>
                  Parties Attended
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                  {thisUser.attending.map((party: Party) => (
                    <NextLink
                      href={`/party/${party.partyId}`}
                      key={party.partyId}
                    >
                      <PartyCard
                        key={party.partyId}
                        name={party.name}
                        time={dayjs(party.date).format("MMM D, dddd hh:mm a")}
                        description={party.info}
                        cursor="pointer"
                      />
                    </NextLink>
                  ))}
                </SimpleGrid>
              </Box>
            )}
            {thisUser.hosting?.length !== 0 && (
              <Box mt={4}>
                <Text variant="title3" mb={2}>
                  Parties Hosted
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                  {thisUser.hosting.map((party: Party) => (
                    <NextLink
                      href={`/party/${party.partyId}`}
                      key={party.partyId}
                    >
                      <PartyCard
                        key={party.partyId}
                        name={party.name}
                        time={dayjs(party.date).format("MMM D, dddd hh:mm a")}
                        description={party.info}
                        cursor="pointer"
                      />
                    </NextLink>
                  ))}
                </SimpleGrid>
              </Box>
            )}
          </Box>
          {thisUser.host && (
            <>
              <Divider my={4} />

              <SubmitUserReviewModal
                userId={thisUser.userId}
                onReviewSubmitted={handleReviewSubmitted}
                isOpen={isOpen}
                onClose={onClose}
              />
              <Flex justifyContent="space-between" alignItems="center">
                <Text variant="title3">Reviews</Text>
                <Button variant="primary" onClick={onOpen}>
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
