import React, { useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  Code,
  Select,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useSelector } from "react-redux";

import { Input, SendMessageModal } from "@Components";
import { useDeleteUsers } from "@Hooks";
import { UserDbo } from "@Models";
import { selectParties, selectUsers } from "@Redux";
import { searchArrayObject } from "@Utils";

const UserTable: React.FC = () => {
  const users = useSelector(selectUsers);
  const parties = useSelector(selectParties);

  const { loading, deleteUsers } = useDeleteUsers();

  const [search, setSearch] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [selectedParty, setParty] = useState("all");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const searchedUsers: UserDbo[] = users
    ? searchArrayObject(users, search)
    : [];
  const filteredUsers: UserDbo[] =
    selectedParty === "all"
      ? searchedUsers
      : searchedUsers.filter((a) => a.attending.includes(selectedParty));
  const sortedUsers = filteredUsers.sort((b, a) => b.createdAt - a.createdAt);

  const handleSelect = (userId: string) => {
    if (selectedUserIds.includes(userId)) {
      setSelectedUserIds((p) => p.filter((a) => a !== userId));
    } else {
      setSelectedUserIds((p) => [userId, ...p]);
    }
  };

  const handleDelete = async () => {
    await deleteUsers(selectedUserIds);
    setSelectedUserIds([]);
  };

  if (!parties || !users) return null;

  return (
    <>
      <SendMessageModal
        isOpen={isOpen}
        onClose={onClose}
        userIds={selectedUserIds}
      />
      <Box mt={6}>
        <Text fontSize="xl">{sortedUsers.length} Users</Text>
        <Box display="flex" flexDirection="row" mt={4}>
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            boxProps={{ mr: 2 }}
          />
          <Select
            width="auto"
            value={selectedParty}
            onChange={(e) => setParty(e.target.value)}
          >
            <option value="all">All</option>
            {parties.map((party) => (
              <option value={party.partyId} key={party.partyId}>
                {party.name}
              </option>
            ))}
          </Select>
          <Box flex={1} />
          <Button
            disabled={selectedUserIds.length === 0}
            onClick={onOpen}
            mr={2}
          >
            Send Message
          </Button>
          <Button
            colorScheme="red"
            disabled={selectedUserIds.length === 0}
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
                <Th>
                  <Checkbox
                    isChecked={selectedUserIds.length === sortedUsers.length}
                    onChange={() =>
                      selectedUserIds.length === sortedUsers.length
                        ? setSelectedUserIds([])
                        : setSelectedUserIds(sortedUsers.map((u) => u.userId))
                    }
                  />
                </Th>
                <Th flex={1}>id</Th>
                <Th flex={1}>Name</Th>
                <Th flex={1}>Phone</Th>
              </Tr>
            </Thead>
            {sortedUsers ? (
              <Tbody>
                {sortedUsers.map((user) => (
                  <Tr key={user.userId}>
                    <Td>
                      <Checkbox
                        isChecked={selectedUserIds.includes(user.userId)}
                        onChange={() => handleSelect(user.userId)}
                      />
                    </Td>
                    <Td>
                      <NextLink href={`/user/${user.userId}`}>
                        <Link as="p">
                          <Code>{user.userId}</Code>
                        </Link>
                      </NextLink>
                    </Td>
                    <Td>{user.name}</Td>
                    <Td>{user.phone}</Td>
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
    </>
  );
};

export default UserTable;
