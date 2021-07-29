import React, { useEffect, useState } from "react";

import { Box, Text, Button } from "@chakra-ui/react";

import Input from "../Input";

type PasswordProtectionProps = {
  onAuth: () => void;
};

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ onAuth }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (localStorage.getItem("auth") === "ihop") onAuth();
  }, []);

  const handleSubmit = () => {
    if (text === "ihop") {
      localStorage.setItem("auth", "ihop");
      onAuth();
    }
  };

  return (
    <Box h="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box
        boxShadow="2xl"
        py={{ base: 4, md: 8 }}
        px={{ base: 4, md: 8 }}
        borderRadius={8}
        backgroundColor="white"
        width="fit-content"
        maxW="500px"
      >
        <Text as="h1" fontWeight="bold" fontSize="5xl" color="orange.400">
          Plots
        </Text>
        <Text as="h2" fontWeight="bold" fontSize="2xl" color="gray.500">
          The Party Platform
        </Text>
        <Text mb={2}>
          Find and attend the best parties in Berkeley. Currently on closed
          beta. DM @caelinsutch on insta for access.
        </Text>
        <Input
          label="Password"
          type="password"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button colorScheme="orange" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default PasswordProtection;
