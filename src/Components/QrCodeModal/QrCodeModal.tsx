import React from "react";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Box } from "@chakra-ui/react";
import QRCode from "react-qr-code";

type QrCodeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  value: string;
};

const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  value,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>QR Code</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          <Box as={QRCode} value={value} mx="auto" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default QrCodeModal;
