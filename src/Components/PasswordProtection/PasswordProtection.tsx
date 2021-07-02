import { Box, Text, Button, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Input from "../Input";
import { Icon } from "../Icon";

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
    <Box
      h="100vh"
      display="flex"
      float="right"
      mr="300"
      alignItems="center"
      fontFamily="Avenir"
      fontSize="xl"
    >
      <Box
        boxShadow="2xl"
        p="20"
        borderRadius={8}
        backgroundColor="white"
        width="fit-content"
        maxW="550px"
      >
        <Box ml={-4}>
          <Icon name="FlareLogo"></Icon>
        </Box>
        <Text as="h2" fontWeight="bold" fontSize="3xl" color="gray.600">
          Closed Beta
        </Text>
        <Text mb={2} color="gray.500">
          Invited to a Flare party?
        </Text>
        <Text mb={2} color="gray.500">
          Enter your beta invite code here.
        </Text>
        <Text mt={8} mb={2}>
          Enter Beta Code{" "}
        </Text>
        <Text mb={2} fontSize="md" fontFamily="monospace">
          Beta Code{" "}
        </Text>
        <Input
          placeholder="abcdef"
          type="betacode"
          value={text}
          pb={-3}
          variant="filled"
          onChange={(e) => setText(e.target.value)}
        />
        <Button colorScheme="orange" pt={-10} w="100%" onClick={handleSubmit}>
          Submit
        </Button>
        <Text my={3} fontFamily="monospace" fontSize="md">
          Already part of Flare? <Link color="orange.400">Sign In</Link>{" "}
        </Text>
      </Box>
    </Box>
  );
};

export default PasswordProtection;
