import React from "react";

import { Box, Text } from "@chakra-ui/react";
import { AuthForm, UserInfo } from "@PageComponents/Home";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";

import { firebaseAdmin, getUser } from "@Api";
import { PageContainer } from "@Components";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    const { uid } = token;

    const { user } = await getUser(uid);

    return {
      props: { user },
    };
  } catch (err) {
    return { props: {} as never };
  }
};
const Home = ({ user: initialUser }: any) => {
  return (
    <PageContainer noNav bgColor="brand.500">
      <Box
        minHeight="100vh"
        backgroundSize="cover"
        justifyContent="center"
        alignItems="center"
        display={{ base: "block", md: "flex" }}
        padding={4}
        flexDirection="column"
        paddingTop={{ base: 14, md: 4 }}
      >
        <Box flex={1}>
          <Text variant="title1" fontSize="6xl" color="white">
            Plots
          </Text>
        </Box>
        <Box flex={1}>
          {initialUser && <UserInfo />}
          {!initialUser && <AuthForm />}
        </Box>
        <Box flex={1} />
      </Box>
    </PageContainer>
  );
};

export default Home;
