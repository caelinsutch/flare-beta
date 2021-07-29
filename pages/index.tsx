import React, { useState } from "react";

import { Box } from "@chakra-ui/react";
import { AuthForm, LeftSide, UserInfo } from "@PageComponents/Home";
import { useSelector } from "react-redux";

import { PageContainer, PasswordProtection } from "@Components";
import { selectUser } from "@Redux";

const Home = () => {
  const user = useSelector(selectUser);

  return (
    <PageContainer noNav>
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
            minWidth="350px"
            minHeight="400px"
            boxShadow="2xl"
          >
            {user && <UserInfo />}
            {!user && <AuthForm />}
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Home;
