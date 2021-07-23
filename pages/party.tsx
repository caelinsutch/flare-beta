import React from "react";
import { Box, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { PageContainer } from "../src/Components";

const Party: React.FC = () => {
  return (
    <PageContainer p={4}>
      <Text fontWeight="bold" fontSize="4xl">
        iHop v2
      </Text>
      <Text fontSize="xl" color="gray.500">
        2448 Prospect St - 10PM
      </Text>
      <Box mt={2}>
        <Text fontSize="2xl">House Rules</Text>
        <OrderedList stylePosition="inside" mt={2}>
          <ListItem>
            If you see something say something, you all have my instagram and
            feel free to talk to me at any point in the night
          </ListItem>
          <ListItem>
            If you yack don't just leave it, we have plenty of paper towels you
            can use
          </ListItem>
          <ListItem>
            We care about the environment, please don't waste solo cups!
          </ListItem>
          <ListItem>Smoke outside, no hard drugs</ListItem>
          <ListItem>
            Don't just stand on the side of the room, drink and have fun
          </ListItem>
          <ListItem>Take a shot at the door</ListItem>
          <ListItem>Don't be a dick and have a good time</ListItem>
        </OrderedList>
      </Box>
      <Box mt={4}>
        <Text fontSize="2xl">Need Something?</Text>
        <Text mt={2}>
          Feel free to text Riley at +1 (559) 554-5667 anytime throughout the
          night if you need something
        </Text>
      </Box>
      {/*<SongRequest />*/}
      {/*<Box mt={4}>*/}
      {/*  <Text fontSize="2xl">Song Request List</Text>*/}
      {/*  <OrderedList stylePosition="inside" mt={2}>*/}
      {/*    <ListItem>Sicko Mode</ListItem>*/}
      {/*  </OrderedList>*/}
      {/*</Box>*/}
    </PageContainer>
  );
};

export default Party;
