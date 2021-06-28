import React from "react";
import { Link, Flex, Container } from "@chakra-ui/react";

const Navbar = () => (
  <Container p={4}>
    <Flex row>
      <Link
        fontSize="3xl"
        color="orange.400"
        fontWeight="bold"
        letterSpacing="widest"
        textDecoration="none"
        href="/"
      >
        FLARE
      </Link>
    </Flex>
  </Container>
);

export default Navbar;
