import React, { useEffect } from "react";

import {
  Box,
  Button,
  Divider,
  Flex,
  Link,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import firebase from "firebase/app";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { PartyCard } from "@Components";
import { useGetUpcomingParties } from "@Hooks";
import { Party } from "@Models";
import { clearUser, selectUser } from "@Redux";

const UserInfo: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const { getUpcomingParties, data } = useGetUpcomingParties();

  useEffect(() => {
    getUpcomingParties();
  }, []);

  if (!user || Object.keys(user).length === 0)
    return (
      <Flex
        flexDirection="column"
        mt={4}
        maxWidth="600px"
        w="100%"
        textAlign="center"
        alignItems="center"
      >
        <Spinner />
      </Flex>
    );

  console.log(data);

  const handleLogout = async () => {
    await firebase.auth().signOut();
    dispatch(clearUser());

    router.reload();
  };

  if (router.query?.redirectParty) {
    router.push(`/party/${router.query.redirectParty}`);
  }

  return (
    <>
      <Flex flexDirection="column" mt={4} maxWidth="600px" w="100%">
        <Text fontSize="lg" color="gray.400" textAlign="center">
          Welcome{" "}
          <NextLink href={`/user/${user.userId}`}>
            <Link color="gray.400">{user.name}</Link>
          </NextLink>
        </Text>
        <Box mt={2}>
          <Text variant="title3" mb={2} color="gray.800">
            Upcoming Parties Near You
          </Text>
          {data ? (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
              {data?.parties.map((party: Party) => (
                <NextLink href={`/party/${party.partyId}`} key={party.partyId}>
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
          ) : (
            <Spinner />
          )}
        </Box>
        {user.attending.length === 0 && user.attending.length === 0 && (
          <Text variant="body1" color="gray.400">
            You haven't signed up for any parties yet!
          </Text>
        )}
        {user.attending.length !== 0 && (
          <Box mt={2}>
            <Text variant="title3" mb={2} color="gray.800">
              Attending
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
              {user.attending.map((party: Party) => (
                <NextLink href={`/party/${party.partyId}`} key={party.partyId}>
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
        {user.hosting.length !== 0 && (
          <Box mt={2}>
            <Text variant="title3" mb={2}>
              Hosted
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
              {user.hosting.map((party: Party) => (
                <NextLink href={`/party/${party.partyId}`} key={party.partyId}>
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

        <Divider my={4} />
        <Button variant="primary" onClick={handleLogout}>
          Log Out
        </Button>
      </Flex>
    </>
  );
};

export default UserInfo;
