import {
  InputProps as ChakraInputProps,
  Input as ChakraInput,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";

type InputProps = {
  label?: string;
  error?: string;
  info?: string;
} & ChakraInputProps;

const Input: React.FC<InputProps> = ({ info, label, error, ...props }) => (
  <Box>
    <Text
      display={label ? "block" : "none"}
      fontSize="xs"
      color="gray.400"
      mb={2}
    >
      {label}
    </Text>
    <ChakraInput
      border="2px solid"
      borderColor="gray.400"
      _hover={{ borderColor: "gray.500" }}
      _focus={{ borderColor: "gray.500" }}
      _placeholder={{ color: "gray.400" }}
      {...props}
    />
    <Text
      mt={2}
      opacity={error || info ? 1 : 0}
      color={error ? "red.400" : "gray.400"}
      fontSize="xs"
    >
      {(error || info) ?? "a"}
    </Text>
  </Box>
);

export default Input;
