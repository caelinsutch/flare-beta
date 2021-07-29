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
  textColor?: string;
} & ChakraInputProps;
type AreaProps = {
  label?: string;
  error?: string;
  info?: string;
  area: true;
  textColor?: string;
} & TextareaProps;

type InputProps = IProps | AreaProps;

const Input: React.FC<InputProps> = ({
  info,
  label,
  error,
  area,
  textColor = "black",
  ...props
}) => (
  <Box textAlign="left">
    <Text
      display={label ? "block" : "none"}
      fontSize="xs"
      fontWeight="bold"
      color={textColor}
      mb={2}
    >
      {label}
    </Text>
    {area ? (
      <Textarea {...(props as AreaProps)} />
    ) : (
      <ChakraInput
        backgroundColor="white"
        _hover={{ borderColor: "gray.500" }}
        _focus={{ borderColor: "gray.500" }}
        _placeholder={{ color: "gray.400" }}
        {...(props as IProps)}
      />
    )}
    <Text
      mt={2}
      opacity={error || info ? 1 : 0}
      color={error ? "red.400" : textColor}
      fontSize="xs"
    >
      {(error || info) ?? "a"}
    </Text>
  </Box>
);

export default Input;
