import React from "react";

import {
  Box,
  Button,
  Divider,
  Flex,
  Link,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import firebase from "firebase/app";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { Party } from "@Models";
import { clearUser, selectUser } from "@Redux";

const UserInfo: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();

  if (!user || Object.keys(user).length === 0)
    return (
      <Box mt={4}>
        <Spinner />
      </Box>
    );

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
      <Flex flexDirection="column" mt={4} maxWidth="350px">
        <Box flex={1}>
          <Text fontSize="xl">Hey {user.name},</Text>
          <Text fontSize="xl" mt={1}>
            We'll text you when the next party drops.
          </Text>
          {user.attending.length !== 0 && (
            <Box mt={2}>
              <Text variant="subtitle2" color="white" mb={2}>
                Attending
              </Text>
              <UnorderedList>
                {user.attending.map((party: Party) => (
                  <ListItem key={party.name} color="white">
                    <Link as="p" color="white">
                      <NextLink href={`/party/${party.partyId}`}>
                        {party.name}
                      </NextLink>
                    </Link>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          )}
          {user.hosting.length !== 0 && (
            <Box mt={2}>
              <Text variant="subtitle2" color="white" mb={2}>
                Hosted
              </Text>
              <UnorderedList>
                {user.hosting.map((party: Party) => (
                  <ListItem key={party.name} color="white">
                    <Link as="p" color="white">
                      <NextLink href={`/party/${party.partyId}`}>
                        {party.name}
                      </NextLink>
                    </Link>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          )}
          <Divider my={4} />
          <Button colorScheme="red" variant="primary" onClick={handleLogout}>
            Log Out
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default UserInfo;
