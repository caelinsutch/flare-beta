import { Box, Text, Button, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Input from "../Input";
import { Illustration } from "../Illustration";

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
    <Box alignItems="center" fontFamily="Avenir" fontSize="xl">
      <Box
        boxShadow="2xl"
        p="16"
        borderRadius={8}
        backgroundColor="white"
        width="fit-content"
        maxW="550px"
      >
        <Box>
          <Illustration name="FlareLogo"></Illustration>
        </Box>
        <Box px={4}>
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
            Enter Beta Code
          </Text>
          <Text mb={2} fontSize="md" fontFamily="monospace">
            Beta Code
          </Text>
          <Input
            placeholder="abcdef"
            type="betacode"
            value={text}
            variant="filled"
            onChange={(e: React.ChangeEvent<any>) => setText(e.target.value)}
          />
          <Button colorScheme="orange" w="100%" onClick={handleSubmit}>
            Submit
          </Button>
          <Text my={3} fontFamily="monospace" fontSize="md">
            Already part of Flare? <Link color="orange.400">Sign In</Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PasswordProtection;
