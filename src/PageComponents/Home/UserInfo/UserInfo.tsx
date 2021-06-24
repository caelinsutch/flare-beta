import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import QRCode from "react-qr-code";

const UserInfo: React.FC = () => {
  const user = useSelector(selectUser);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!user)
    return (
      <Box mt={4}>
        <Spinner />
      </Box>
    );

  return (
    <>
      <Box mt={4}>
        <Text fontSize="lg" color="green.500">
          Registered under {user.phone}
        </Text>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          my={8}
          onClick={onOpen}
        >
          <QRCode
            value={`https://beta.flaresocial.app/qr/${user.phone}`}
            size={96}
          />
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>QR Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              as={QRCode}
              value={`https://beta.flaresocial.app/qr/${user.phone}`}
              size={200}
              mx="auto"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserInfo;
