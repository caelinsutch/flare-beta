import React, { useEffect, useState } from "react";
import {
  Box,
  OrderedList,
  Text,
  ListItem,
  TabPanel,
  TabPanels,
  Tab,
  Tabs,
  TabList,
} from "@chakra-ui/react";
import { useGetUsers } from "../src/Hooks";
import { useSelector } from "react-redux";
import { selectUsers } from "../src/Redux";
import { PageContainer, PasswordProtection } from "../src/Components";
import { SendAnnouncement, UserTable } from "../src/PageComponents/Admin";

const Admin: React.FC = () => {
  const { getUsers } = useGetUsers();
  const users = useSelector(selectUsers);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getUsers();
    if (localStorage.getItem("auth") == "true") setLoggedIn(true);
  }, []);

  return (
    <PageContainer>
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
          <Box my={2}>
            <Text fontSize="lg">Door Talk</Text>
            <Text>
              Hey welcome to iHop. Before we can let you in we'll have to make
              sure you're on the guest list and go through a couple house rules.
            </Text>
            <OrderedList stylePosition="inside" mt={2}>
              <ListItem>
                If you yack don't just leave it, we have plenty of paper towels
                you can use
              </ListItem>
              <ListItem>
                If you see something say something, you all have my instagram
                and feel free to talk to me at any point in the night
              </ListItem>
              <ListItem>
                Don't just stand on the side of the room, drink and have fun
              </ListItem>
              <ListItem>Don't be a dick and have a good time</ListItem>{" "}
              <ListItem>Take a shot </ListItem>
            </OrderedList>
          </Box>
          <Box mt={4}>
            <Box>
              <Text color="gray.700" fontSize="lg">
                <b>Total Users:</b> {users?.length}
              </Text>
            </Box>
          </Box>
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
