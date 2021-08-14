import React from "react";

import { Box, Text } from "@chakra-ui/react";
import authorizeServerSide from "@Utils/authorizeServerSide";
import { GetServerSidePropsContext } from "next";

import { PageContainer } from "@Components";
import { User } from "@Models";
import { PartyForm } from "@PageComponents";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { user } = await authorizeServerSide(ctx);

  if (!user?.host) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
    return { props: {} as never };
  }

  return { props: { user } };
};

const NewPartyPage = ({ user }: { user: User }) => {
  return (
    <PageContainer initialUser={user}>
      <Box maxW="400px" mx="auto" textAlign="center">
        <Text variant="title1">New Party</Text>
        <PartyForm />
      </Box>
    </PageContainer>
  );
};

export default NewPartyPage;
