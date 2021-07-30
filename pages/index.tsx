import React from "react";

import { Box, Text } from "@chakra-ui/react";
import { AuthForm, UserInfo } from "@PageComponents/Home";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { useSelector } from "react-redux";

import { firebaseAdmin, getUser } from "@Api";
import { PageContainer } from "@Components";
import { selectUser } from "@Redux";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    const { uid } = token;

    const { user } = await getUser(uid);

    if (user && ctx.query?.redirectParty) {
      return {
        redirect: {
          permanent: false,
          destination: `/party/${ctx.query.redirectParty}`,
        },
      };
    }

    return {
      props: { user },
    };
  } catch (err) {
    return { props: {} as never };
  }
};
const Home = ({ user: initialUser }: any) => {
  const user = useSelector(selectUser);
  return (
    <PageContainer noNav bgColor="brand.500">
      <Box
        minH="100vh"
        backgroundSize="cover"
        justifyContent="center"
        alignItems="center"
        display="flex"
        padding={4}
        flexDirection="column"
        paddingTop={{ base: 14, md: 4 }}
      >
        <Box flex={1}>
          <Text variant="title1" fontSize="6xl" color="white">
            PLOTS
          </Text>
        </Box>
        <Box flex={1}>{initialUser || user ? <UserInfo /> : <AuthForm />}</Box>
        <Box>
          <Text fontSize="sm" color="white">
            Issues? DM @caelinsutch on Insta
          </Text>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Home;
