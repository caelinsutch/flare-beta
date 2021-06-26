import { Box, Input, Text, Button } from "@chakra-ui/react";
import React, { useState } from "react";

type PasswordProtectionProps = {
  onAuth: () => void;
};

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ onAuth }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text === "ihop") {
      onAuth();
    }
  };

  return (
    <Box h="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box
        boxShadow="2xl"
        py={{ base: 4, md: 8 }}
        px={{ base: 8, md: 16 }}
        borderRadius={8}
        backgroundColor="white"
        width="fit-content"
      >
        <Text fontSize="2xl">Log In</Text>
        <Input
          type="password"
          value={text}
          onChange={(e) => setText(e.target.value)}
          my={4}
        />
        <Button colorScheme="orange" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default PasswordProtection;
