import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux";
import { Box, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import QRCode from "react-qr-code";

const UserInfo: React.FC = () => {
  const user = useSelector(selectUser);

  if (!user)
    return (
      <Box mt={4}>
        <Spinner />
      </Box>
    );

  return (
    <Box mt={4}>
      <Text fontSize="lg" color="green.500">
        Registered under {user.phone}
      </Text>
      <Box display="flex" alignItems="center" justifyContent="center" mt={8}>
        <QRCode
          value={`https://beta.flaresocial.app/qr/${user.phone}`}
          size={96}
        />
      </Box>
    </Box>
  );
};

export default UserInfo;
