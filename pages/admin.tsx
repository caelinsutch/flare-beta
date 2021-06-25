import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/layout";
import {
  Checkbox,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useGetUsers } from "../src/Hooks";
import { useSelector } from "react-redux";
import { selectUsers } from "../src/Redux";
import { Input, PageContainer } from "../src/Components";
import { User } from "../src/Models/User";
import searchArrayObject from "../src/Utils/searchArrayObject";
import { SendAnnouncement } from "../src/PageComponents/Admin";

const Admin: React.FC = () => {
  const { getUsers } = useGetUsers();
  const users = useSelector(selectUsers);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers: User[] = users ? searchArrayObject(users, search) : [];

  const sortedUsers = filteredUsers.sort((b, a) => b.createdAt - a.createdAt);

  const handleSelect = (phone: string) => {
    if (selected.includes(phone)) {
      setSelected((p) => p.filter((a) => a !== phone));
    } else {
      setSelected((p) => [phone, ...p]);
    }
  };

  return (
    <PageContainer>
      <Box padding={4} paddingTop={{ base: 14, md: 4 }}>
        <Text fontSize="3xl" fontWeight="bold">
          Admin Dashboard
        </Text>
        <SendAnnouncement />
        <Box mt={4}>
          <Text fontSize="xl" mb={2}>
            Users
          </Text>
          <Box width="fit-content">
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr fontWeight="bold">
                <Th w="52px" p={0} />
                <Th w="52px" p={0} />
                <Th flex={1}>Name</Th>
                <Th flex={1}>Phone</Th>
                <Th flex={1}>Insta Handle</Th>
              </Tr>
            </Thead>
            {sortedUsers ? (
              <Tbody>
                {sortedUsers.map((user, i) => (
                  <Tr key={user.name}>
                    <Td>{i}</Td>
                    <Td>
                      <Checkbox
                        isChecked={selected.includes(user.phone)}
                        onChange={() => handleSelect(user.phone)}
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
    </PageContainer>
  );
};

export default Admin;
