import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUser } from "../../../Redux";
import {
  Box,
  Button,
  Divider,
  Link,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { Party } from "../../../Models/Party";
import firebase from "firebase/app";

const UserInfo: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  if (!user)
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
      <Box mt={4}>
        <Text fontSize="lg" color="gray.400">
          Hey {user.name}
        </Text>
        {user.attending.length !== 0 && (
          <Box mt={2}>
            <Text fontSize="2xl" color="gray.800" mb={2}>
              Attending
            </Text>
            <UnorderedList>
              {user.attending.map((party: Party) => (
                <Link as="li" key={party.name} href={`/party/${party.partyId}`}>
                  {party.name}
                </Link>
              ))}
            </UnorderedList>
          </Box>
        )}
        {user.hosting.length !== 0 && (
          <Box mt={2}>
            <Text fontSize="2xl" color="gray.800" mb={2}>
              Hosted
            </Text>
            <UnorderedList>
              {user.hosting.map((party: Party) => (
                <Link as="li" key={party.name} href={`/party/${party.partyId}`}>
                  {party.name}
                </Link>
              ))}
            </UnorderedList>
          </Box>
        )}
        <Divider my={4} />
        <Button colorScheme="red" onClick={handleLogout}>
          Log Out
        </Button>
      </Box>
    </>
  );
};

export default UserInfo;
