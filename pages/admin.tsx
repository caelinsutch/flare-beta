import React, { useEffect, useState } from "react";
import {
  Box,
  OrderedList,
  Text,
  Button,
  Checkbox,
  ListItem,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useDeleteUsers, useGetUsers } from "../src/Hooks";
import { useSelector } from "react-redux";
import { selectUsers } from "../src/Redux";
import { Input, PageContainer, PasswordProtection } from "../src/Components";
import { User } from "../src/Models/User";
import searchArrayObject from "../src/Utils/searchArrayObject";
import { SendAnnouncement } from "../src/PageComponents/Admin";

const Admin: React.FC = () => {
  const { getUsers } = useGetUsers();
  const { deleteUsers } = useDeleteUsers();
  const users = useSelector(selectUsers);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers: User[] = users ? searchArrayObject(users, search) : [];

  const sortedUsers = filteredUsers.sort((b, a) => b.createdAt - a.createdAt);

  const handleSelect = (userId: string) => {
    if (selected.includes(userId)) {
      setSelected((p) => p.filter((a) => a !== userId));
    } else {
      setSelected((p) => [userId, ...p]);
    }
  };

  const handleDelete = async () => {
    await deleteUsers(selected);
    setSelected([]);
  };

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
          <Box mt={4}>
            <Text fontSize="xl" mb={2}>
              Users
            </Text>
            <Box display="flex" flexDirection="row">
              <Input
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Box flex={1} />
              <Button
                colorScheme="red"
                disabled={selected.length === 0}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
            <Box overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr fontWeight="bold">
                    <Th w="52px" p={0} />
                    <Th flex={1}>Name</Th>
                    <Th flex={1}>Phone</Th>
                    <Th flex={1}>Insta Handle</Th>
                    <Th flex={1}>Actions</Th>
                  </Tr>
                </Thead>
                {sortedUsers ? (
                  <Tbody>
                    {sortedUsers.map((user) => (
                      <Tr key={user.userId}>
                        <Td>
                          <Checkbox
                            isChecked={selected.includes(user.userId)}
                            onChange={() => handleSelect(user.userId)}
                          />
                        </Td>
                        <Td>{user.name}</Td>
                        <Td>{user.phone}</Td>
                        <Td>{user.instagram}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                ) : (
                  new Array(10).fill(0).map((_, i) => (
                    <Tr key={`fakerow-${i}`}>
                      <Td>
                        <Skeleton height="30px" />
                      </Td>
                      <Td>
                        <Skeleton height="30px" />
                      </Td>
                      <Td>
                        <Skeleton height="30px" />
                      </Td>
                      <Td>
                        <Skeleton height="30px" />
                      </Td>
                    </Tr>
                  ))
                )}
              </Table>
            </Box>
          </Box>
        </Box>
      )}
    </PageContainer>
  );
};

export default Admin;
