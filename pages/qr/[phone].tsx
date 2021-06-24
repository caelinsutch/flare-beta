import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useGetUser } from "../../src/Hooks";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectUser } from "../../src/Redux";

const Phone = () => {
  const router = useRouter();
  const { getUser, loading } = useGetUser();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!router.isReady) return;

    const { phone } = router.query;

    getUser(phone as string);
  }, [router.isReady]);

  if (loading || !router.isReady) {
    return (
      <Box p={16}>
        <Spinner size="2xl" color="orange.400" />
      </Box>
    );
  }

  return (
    <Box maxW="1200px" p={8}>
      <Box>
        {user ? (
          <Text fontSize="4xl" color={"green.400"}>
            {user?.name}
          </Text>
        ) : (
          <Text fontSize="4xl" color="red.400">
            User not found!
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Phone;
