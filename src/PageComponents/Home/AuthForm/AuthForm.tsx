import React, { useState } from "react";

import { Link, Text, Flex } from "@chakra-ui/react";

import { VerifyPhone } from "@Components";

import RegisterForm from "../RegisterForm";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Flex direction="column" alignItems="center" textAlign="center">
        {isLogin ? <VerifyPhone /> : <RegisterForm />}
        {isLogin ? (
          <Text fontSize="xs" mt={4} color="gray.800">
            Dont&apos;t have an account?{" "}
            <Link color="white" onClick={() => setIsLogin(false)}>
              Sign Up
            </Link>
          </Text>
        ) : (
          <Text fontSize="xs" mt={4} color="gray.800">
            Already party of Plots?{" "}
            <Link onClick={() => setIsLogin(true)} color="white">
              Sign in
            </Link>
          </Text>
        )}
      </Flex>
    </>
  );
};

export default AuthForm;
