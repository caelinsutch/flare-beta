import {
  Box,
  Button,
  Checkbox,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Input } from "../../../Components";
import React, { useState } from "react";
import { useDeleteUsers } from "../../../Hooks";
import { useSelector } from "react-redux";
import { selectUsers } from "../../../Redux";
import { User } from "../../../Models/User";
import searchArrayObject from "../../../Utils/searchArrayObject";

const UserTable: React.FC = () => {
  const users = useSelector(selectUsers);

  const { loading, deleteUsers } = useDeleteUsers();

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

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
    <Box mt={6}>
      <Text fontSize="xl">Users</Text>
      <Box display="flex" flexDirection="row" mt={4}>
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
          isLoading={loading}
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
  );
};

export default UserTable;
