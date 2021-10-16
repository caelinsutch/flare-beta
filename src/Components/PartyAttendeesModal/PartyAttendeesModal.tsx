import React, { useState } from "react";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Select, Table, Td, Th, Thead, Tr } from "@chakra-ui/react";

import { useUpdatePartyAttendeeStatus } from "@Hooks";
import { Party, PartyAttendee } from "@Models";

type PartyAttendeesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  party: Party;
};

const PartyAttendeesModal: React.FC<PartyAttendeesModalProps> = ({
  party: initialParty,
  isOpen,
  onClose,
}) => {
  const [party, setParty] = useState(initialParty);
  const { updatePartyAttendeeStatus } = useUpdatePartyAttendeeStatus();

  const handleChange = async (
    userId: string,
    status: "attending" | "applied"
  ) => {
    setParty((p) => ({
      ...p,
      attendees: [
        ...p.attendees.filter((a) => a.userId !== userId),
        {
          ...(p.attendees.find((a) => a.userId === userId) as PartyAttendee),
          status,
        },
      ],
    }));
    await updatePartyAttendeeStatus(party.partyId, userId, status);
  };

  return (
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
                <Th flex={1}>Status</Th>
              </Tr>
            </Thead>
            {party.attendees.map((attendee) => (
              <Tr key={attendee.userId}>
                <Td>{attendee.userId}</Td>
                <Td>{attendee.name}</Td>
                <Td>
                  <Select
                    value={attendee.status}
                    onChange={(v) =>
                      handleChange(attendee.userId, v.target.value as any)
                    }
                  >
                    <option value="attending">Attending</option>
                    <option value="applied">Requested</option>
                  </Select>
                </Td>
              </Tr>
            ))}
          </Table>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PartyAttendeesModal;
