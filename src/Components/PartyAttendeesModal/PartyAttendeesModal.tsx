import React from "react";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Table, Td, Th, Thead, Tr } from "@chakra-ui/react";

import { Party } from "@Models";

type PartyAttendeesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  party: Party;
};

const PartyAttendeesModal: React.FC<PartyAttendeesModalProps> = ({
  party,
  isOpen,
  onClose,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} size="3xl">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{party.name} Attendees</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr fontWeight="bold">
              <Th flex={1}>id</Th>
              <Th flex={1}>Name</Th>
              <Th flex={1}>Paid</Th>
            </Tr>
          </Thead>
          {party.attendees.map((attendee) => (
            <Tr key={attendee.userId}>
              <Td>{attendee.userId}</Td>
              <Td>{attendee.name}</Td>
              <Td>True</Td>
            </Tr>
          ))}
        </Table>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default PartyAttendeesModal;
