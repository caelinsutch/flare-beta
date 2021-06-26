import { Box, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { PageContainer } from "../index";
import React from "react";

const SongRequest: React.FC = () => {
  return (
    <Box mt={4}>
      <Text fontSize="2xl">Song Request List</Text>
      <OrderedList stylePosition="inside" mt={2}>
        <ListItem>Sicko Mode</ListItem>
      </OrderedList>
    </Box>
  );
};

export default SongRequest;
