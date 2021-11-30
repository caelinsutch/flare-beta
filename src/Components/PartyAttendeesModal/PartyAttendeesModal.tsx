import React, { useState } from "react";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  Select,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tag,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

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

  const totalRevenue = party.attendees.reduce(
    (sum, attendee) => sum + (attendee?.amountPaid ?? 0),
    0
  );

  const totalPaidAttendees = party.attendees.filter((a) => a.amountPaid).length;

  const totalMen = party.attendees.filter(
    (a) => a.amountPaid && a.amountPaid === 4000
  ).length;
  const totalWomen = party.attendees.filter(
    (a) => a.amountPaid && a.amountPaid === 2000
  ).length;
  const totalAttending = party.attendees.filter(
    (a) => a.status === "attending"
  ).length;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{party.name} Attendees</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <StatGroup>
            <Stat>
              <StatLabel>Total Revenue</StatLabel>
              <StatNumber>${totalRevenue / 100}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Total Paid Attendees</StatLabel>
              <StatNumber>{totalPaidAttendees}</StatNumber>
              <StatHelpText>
                {totalMen} men, {totalWomen} women
              </StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Total Attendees</StatLabel>
              <StatNumber>{party.attendees.length}</StatNumber>
              <StatHelpText>{totalAttending} marked as attending</StatHelpText>
            </Stat>
          </StatGroup>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr fontWeight="bold">
                <Th flex={1}>Name</Th>
                <Th flex={1}>Paid</Th>
                <Th flex={1}>Status</Th>
              </Tr>
            </Thead>
            {party.attendees.map((attendee) => (
              <Tr key={attendee.userId}>
                <Td>{attendee.name}</Td>
                <Td>
                  <Tag colorScheme={attendee.amountPaid ? "green" : "red"}>
                    {attendee?.amountPaid
                      ? `$${attendee.amountPaid / 100}`
                      : "Not Paid"}
                  </Tag>
                </Td>
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
