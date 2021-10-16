import React from "react";

import { Modal } from "@chakra-ui/modal";

import { Party } from "@Models";

type EditPartyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  party: Party;
};

const EditPartyModal: React.FC<EditPartyModalProps> = ({
  isOpen,
  onClose,
  party,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/*<ModalOverlay />*/}
      {/*<ModalContent>*/}
      {/*  <ModalHeader>Update Party</ModalHeader>*/}
      {/*  <ModalCloseButton />*/}
      {/*  <ModalBody>*/}
      {/*    <PartyForm*/}
      {/*      onDone={onClose}*/}
      {/*      partyId={party.partyId}*/}
      {/*      defaults={{*/}
      {/*        address: party.address,*/}
      {/*        date: new Date(party.date),*/}
      {/*        info: party.info,*/}
      {/*        name: party.name,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </ModalBody>*/}
      {/*</ModalContent>*/}
    </Modal>
  );
};

export default EditPartyModal;
