import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux";
import { Box, Link, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import QRCode from "react-qr-code";
import { Party } from "../../../Models/Party";

const UserInfo: React.FC = () => {
  const user = useSelector(selectUser);

  if (!user)
    return (
      <Box mt={4}>
        <Spinner />
      </Box>
    );

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
            {user.attending.map((party: Party) => (
              <Link key={party.name} href={`/party/${party.partyId}`}>
                {party.name}
              </Link>
            ))}
          </Box>
        )}
        {user.hosting.length !== 0 && (
          <Box mt={2}>
            <Text fontSize="2xl" color="gray.800" mb={2}>
              Hosted
            </Text>
            {user.hosting.map((party: Party) => (
              <Link key={party.name} href={`/party/${party.partyId}`}>
                {party.name}
              </Link>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default UserInfo;
