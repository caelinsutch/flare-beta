import React from "react";
import { Link, Flex, Container } from "@chakra-ui/react";
import NextLink from "next/link";

const Navbar = () => (
  <Container p={4}>
    <Flex row>
      <Link
        as="p"
        fontSize="3xl"
        color="orange.400"
        fontWeight="bold"
        letterSpacing="widest"
        textDecoration="none"
        href="/"
      >
        <NextLink href="/">FLARE</NextLink>
      </Link>
    </Flex>
  </Container>
);

export default Navbar;
