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
import { Textarea, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { useSendMessage } from "@Hooks";
import { selectUsers } from "@Redux";

type SendMessageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userIds: string[];
};

const SendMessageModal: React.FC<SendMessageModalProps> = ({
  isOpen,
  onClose,
  userIds,
}) => {
  const toast = useToast();

  const users = useSelector(selectUsers);
  const { sendMessage, error, loading } = useSendMessage();

  const [text, setText] = useState("");

  const handleSubmit = async () => {
    if (users) {
      const res = await sendMessage(
        users.filter((u) => userIds.includes(u.userId)).map((u) => u.phone),
        text
      );
      if (res?.status === "ok") {
        setText("");
        toast({
          status: "success",
          title: "Message sent!",
        });
        onClose();
      }
      if (res?.failedNumbers?.length > 0) {
        toast({
          status: "warning",
          title: `${res.failedNumbers.length} messages failed to send`,
          description: res.failedNumbers.join(", "),
        });
      }
    }
  };

  useEffect(() => {
    if (!isOpen) setText("");
  }, [isOpen]);

  useEffect(() => {
    if (error) {
      console.error(error);
      toast({
        status: "error",
        title: "Error sending message!",
      });
    }
  }, [error]);

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
          <Textarea
            maxLength={160}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Text fontSize="xs" mt={2}>
            {text.length} / 160 Characters
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={handleSubmit} isLoading={loading}>
            Send
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default SendMessageModal;
