import React, { useEffect, useState } from "react";

import { Box, Text } from "@chakra-ui/layout";
import { Button, Textarea, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { useSendMessage } from "@Hooks";
import { selectUsers } from "@Redux";

const SendAnnouncement = () => {
  const users = useSelector(selectUsers);
  const { sendMessage, error, loading } = useSendMessage();
  const toast = useToast();
  const [text, setText] = useState<string>("");
  const [failedNumbers, setFailedNumbers] = useState<string[]>();

  const handleSubmit = async () => {
    if (users) {
      const res = await sendMessage(
        users.map((u) => u.phone),
        text
      );
      if (res.status === "ok") {
        setText("");
      }
      if (res?.failedNumbers) {
        setFailedNumbers(res.failedNumbers);
      }
    }
  };

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
    <Box mt={4} width="fit-content">
      <Text fontSize="xl" mb={2}>
        Send Announcement to All Users (160 char limit)
      </Text>
      <Textarea
        maxLength={160}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Text fontSize="xs" mt={2}>
        {text.length} Characters
      </Text>

      <Button
        colorScheme="orange"
        onClick={handleSubmit}
        mt={4}
        isLoading={loading}
      >
        Send
      </Button>

      <Text fontSize="sm" color="red.400">
        {failedNumbers && failedNumbers.join(", ")}
      </Text>
    </Box>
  );
};

export default SendAnnouncement;
