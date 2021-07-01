import React from "react";

import {
  InputProps as ChakraInputProps,
  Input as ChakraInput,
  Textarea,
  TextareaProps,
  Box,
  Text,
} from "@chakra-ui/react";

type IProps = {
  label?: string;
  error?: string;
  info?: string;
  area?: false;
} & ChakraInputProps;
type AreaProps = {
  label?: string;
  error?: string;
  info?: string;
  area: true;
} & TextareaProps;

type InputProps = IProps | AreaProps;

const Input: React.FC<InputProps> = ({
  info,
  label,
  error,
  area,
  ...props
}) => (
  <Box>
    <Text
      display={label ? "block" : "none"}
      fontSize="xs"
      color="gray.400"
      mb={2}
    >
      {label}
    </Text>
    {area ? (
      <Textarea {...(props as AreaProps)} />
    ) : (
      <ChakraInput
        border="2px solid"
        borderColor="gray.400"
        _hover={{ borderColor: "gray.500" }}
        _focus={{ borderColor: "gray.500" }}
        _placeholder={{ color: "gray.400" }}
        {...(props as IProps)}
      />
    )}
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
