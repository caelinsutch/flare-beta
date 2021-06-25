import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUsers } from "../../Redux";
import { Box, Text } from "@chakra-ui/layout";
import { Button, Textarea } from "@chakra-ui/react";

const SendAnnouncement = () => {
  const users = useSelector(selectUsers);
  const [text, setText] = useState<string>("");

  const handleSubmit = () => {};

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

      <Button colorScheme="orange" onClick={handleSubmit} mt={4}>
        Send
      </Button>
    </Box>
  );
};

export default SendAnnouncement;
