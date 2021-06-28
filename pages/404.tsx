import { Box, Container, Image, Text } from "@chakra-ui/react";
import React from "react";
import { PageContainer } from "../src/Components";

const NotFound: React.FC = () => (
  <PageContainer>
    <Container pt={4}>
      <Image
        src="https://media.giphy.com/media/3oEjI9T0ixjZCFwi8U/giphy.gif"
        maxW="300px"
        borderRadius={4}
      />
      <Text fontSize="xs" mt={4} color="gray.500">
        Accurate Depiction of the Dev Team Trying to Find this Page
      </Text>

      <Text color="red.400" mt={2}>
        404 Not Found
      </Text>
    </Container>
  </PageContainer>
);

export default NotFound;
