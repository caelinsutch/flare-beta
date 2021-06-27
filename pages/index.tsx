import React, { useEffect, useState } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { AuthForm, LeftSide, UserInfo } from "../src/PageComponents/Home";
import { selectUser } from "../src/Redux";
import { useSiteSetup } from "../src/Hooks";
import { PageContainer } from "../src/Components";

const Home = () => {
  const loading = useSiteSetup();

  const user = useSelector(selectUser);

  return (
    <PageContainer>
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
    </PageContainer>
  );
};

export default Home;
