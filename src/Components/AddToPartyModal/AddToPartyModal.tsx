import React, { useEffect, useState } from "react";

import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Select } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { useGetUsers, useRegisterUsersForParty } from "@Hooks";
import { selectParties, selectUsers } from "@Redux";

type AddToPartyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userIds: string[];
};
const AddToPartyModal: React.FC<AddToPartyModalProps> = ({
  isOpen,
  onClose,
  userIds,
}) => {
  const parties = useSelector(selectParties);
  const { getUsers } = useGetUsers();

  const { registerUsersForParty, loading, data } = useRegisterUsersForParty();

  const [selectedParty, setParty] = useState<string>();

  const users = useSelector(selectUsers);

  const handleSubmit = async () => {
    if (selectedParty) {
      await registerUsersForParty(selectedParty, userIds);
    }
  };

  useEffect(() => {
    if (data?.status === "ok") {
      getUsers();
      onClose();
    }
  }, [data]);

  if (!parties) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Send announcement to {userIds.length} users</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4} fontSize="xs" fontWeight={400}>
            Users:{" "}
            {users
              ?.filter((u) => userIds.includes(u.userId))
              .map((u) => u.name)
              .join(", ")}
          </Text>
          <Select
            width="auto"
            placeholder="Select Party"
            value={selectedParty}
            onChange={(e) => setParty(e.target.value)}
          >
            {parties.map((party) => (
              <option value={party.partyId} key={party.partyId}>
                {party.name}
              </option>
            ))}
          </Select>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} isLoading={loading} onClick={handleSubmit}>
            Add
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddToPartyModal;
