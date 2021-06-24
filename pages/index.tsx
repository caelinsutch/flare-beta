import React, { useEffect, useState } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { AuthForm, LeftSide, UserInfo } from "../src/PageComponents/Home";
import { selectUser } from "../src/Redux";
import { useGetUser } from "../src/Hooks";

const Home = () => {
  const user = useSelector(selectUser);
  const { getUser, loading } = useGetUser();

  useEffect(() => {
    const p = localStorage.getItem("phone");
    if (p) {
      getUser(p);
    }
  }, []);

  return (
    <Box
      height="100vh"
      backgroundImage="url('./bg.svg')"
      backgroundSize="cover"
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      padding={4}
      paddingTop={{ base: 14, md: 4 }}
    >
      <LeftSide />
      <Box flex={1}>
        <Box
          mx="auto"
          py={{ base: 4, md: 8 }}
          px={{ base: 8, md: 16 }}
          borderRadius={8}
          backgroundColor="white"
          width="fit-content"
          boxShadow="2xl"
        >
          <Text as="h1" fontWeight="bold" fontSize="3xl" color="#F49D37">
            June 26th
          </Text>
          <Text as="h1" fontWeight="bold" fontSize="3xl" color="#F49D37">
            Berkeley, CA
          </Text>
          <Box
            as="ul"
            style={{ listStylePosition: "inside", color: "#958E86" }}
            mt={2}
          >
            <Text as="li">Jungle Juice</Text>
            <Text as="li">Music</Text>
            <Text as="li">One big ass house</Text>
            <Text as="li">Addy dropped 8PM</Text>
          </Box>
          {loading && (
            <Box mt={4} textAlign="center" size="xl">
              <Spinner color="orange.500" />
            </Box>
          )}
          {user && <UserInfo />}
          {!user && !loading && <AuthForm />}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
