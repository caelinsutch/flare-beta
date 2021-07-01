import React from "react";

import { Box, ListItem, OrderedList, Text } from "@chakra-ui/react";

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
