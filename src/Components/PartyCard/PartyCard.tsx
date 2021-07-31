import React from "react";

import { Box, BoxProps, Text } from "@chakra-ui/react";

type PartyCardProps = {
  name: string;
  time: string;
  description: string;
} & BoxProps;

const PartyCard: React.FC<PartyCardProps> = ({
  name,
  time,
  description,
  ...props
}) => {
  return (
    <Box
      borderWidth={1}
      borderColor="gray.200"
      borderRadius={4}
      p={4}
      {...props}
    >
      <Text variant="subtitle1" color="gray.600">
        {name}
      </Text>
      <Text fontSize="xs" color="gray.400">
        {time}
      </Text>
      <Text fontSize="sm" color="gray.600" mt={2}>
        {description}
      </Text>
    </Box>
  );
};

export default PartyCard;
