import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUser } from "../../../Redux";
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
import React from "react";
import { Party } from "../../../Models";
import firebase from "firebase/app";
import NextLink from "next/link";

const UserInfo: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  if (!user || Object.keys(user).length === 0)
    return (
      <Box mt={4}>
        <Spinner />
      </Box>
    );

  const handleLogout = async () => {
    await firebase.auth().signOut();
    dispatch(clearUser());
  };

  return (
    <>
      <Flex flexDirection="column" mt={4} minHeight="400px" maxWidth="350px">
        <Box flex={1}>
          <Text fontSize="lg" color="gray.400">
            Hey {user.name}
          </Text>
          <Text fontSize="xl" mt={2}>
            We'll text you when the next party drops.
          </Text>
          {user.attending.length !== 0 && (
            <Box mt={2}>
              <Text variant="subtitle2" mb={2}>
                Attending
              </Text>
              <UnorderedList>
                {user.attending.map((party: Party) => (
                  <ListItem key={party.name}>
                    <Link as="p">
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
              <Text variant="subtitle2" mb={2}>
                Hosted
              </Text>
              <UnorderedList>
                {user.hosting.map((party: Party) => (
                  <ListItem key={party.name}>
                    <Link as="p">
                      <NextLink href={`/party/${party.partyId}`}>
                        {party.name}
                      </NextLink>
                    </Link>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          )}
        </Box>

        <Divider my={4} />
        <Button colorScheme="red" onClick={handleLogout}>
          Log Out
        </Button>
      </Flex>
    </>
  );
};

export default UserInfo;
