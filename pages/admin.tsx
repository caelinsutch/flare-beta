import React, { useEffect, useState } from "react";

import {
  Box,
  Text,
  TabPanel,
  TabPanels,
  Tab,
  Tabs,
  TabList,
} from "@chakra-ui/react";
import { SendAnnouncement, UserTable } from "@PageComponents/Admin";
import authorizeServerSide from "@Utils/authorizeServerSide";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import { PageContainer, PasswordProtection } from "@Components";
import { useGetParties, useGetUsers } from "@Hooks";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { user } = await authorizeServerSide(ctx, true);

  return { props: { user } };
};

const Admin: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({ user }) => {
    const { getUsers } = useGetUsers();
    const { getParties } = useGetParties();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
      getUsers();
      getParties(true);
      if (localStorage.getItem("auth") == "true") setLoggedIn(true);
    }, []);

    return (
      <PageContainer initialUser={user} noNav>
        {!loggedIn ? (
          <PasswordProtection
            onAuth={() => {
              setLoggedIn(true);
              localStorage.setItem("auth", "true");
            }}
          />
        ) : (
          <Box padding={4} paddingTop={{ base: 14, md: 4 }}>
            <Text fontSize="3xl" fontWeight="bold">
              Admin Dashboard
            </Text>
            <SendAnnouncement />
            <Tabs variant="line" mt={4}>
              <TabList>
                <Tab>Users</Tab>
                <Tab>Song Requests</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <UserTable />
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        )}
      </PageContainer>
    );
  };

export default Admin;
