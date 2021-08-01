import React from "react";

import { Link, Flex, Container } from "@chakra-ui/react";
import NextLink from "next/link";

const Navbar = () => (
  <Container p={4}>
    <Flex row justify="center">
      <Link
        as="h1"
        fontSize="6xl"
        color="brand.500"
        fontWeight="bold"
        textDecoration="none"
        href="/"
      >
        <NextLink href="/">PLOTS</NextLink>
      </Link>
    </Flex>
  </Container>
);

export default Navbar;
