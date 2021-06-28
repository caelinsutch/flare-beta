import React, { useState } from "react";
import RegisterForm from "../RegisterForm";
import { Box, Link, Text } from "@chakra-ui/react";
import { VerifyPhone } from "../../../Components";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Text as="h1" fontWeight="bold" fontSize="5xl" color="orange.400">
        Flare
      </Text>
      <Text as="h2" fontWeight="bold" fontSize="2xl" color="gray.500">
        The Party Finding Platform
      </Text>
      <Box
        as="ul"
        style={{ listStylePosition: "inside", color: "#958E86" }}
        mt={2}
      >
        <Text as="li">Find Parties</Text>
        <Text as="li">Attend Parties</Text>
        <Text as="li">Review Parties</Text>
      </Box>
      {isLogin ? <VerifyPhone /> : <RegisterForm />}
      {isLogin ? (
        <Text fontSize="xs" mt={2} color="gray.400">
          Dont&apos;t have an account?{" "}
          <Link onClick={() => setIsLogin(false)}>Register</Link>
        </Text>
      ) : (
        <Text fontSize="xs" mt={2} color="gray.400">
          Already Registered?{" "}
          <Link onClick={() => setIsLogin(true)}>Log in</Link>
        </Text>
      )}
    </>
  );
};

export default AuthForm;
