import React, { useEffect } from "react";
import { Box } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { Input, Link, Text, useToast } from "@chakra-ui/react";
import { useGetUser } from "../../../Hooks";

type RegisterFormProps = {
  onSetLogin: () => void;
};

const LoginForm: React.FC<RegisterFormProps> = ({ onSetLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { getUser, error, data } = useGetUser();
  const toast = useToast();

  const onSubmit = async ({ phone }: any) => {
    await getUser(phone);
  };

  useEffect(() => {
    if (data?.phone) localStorage.setItem("phone", data.phone);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast({
        status: "error",
        title: "Phone number not recognized!",
        description: "Have you registered yet?",
      });
    }
  }, [error]);

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      toast({
        status: "error",
        title: "Phone must be 9163174484 format!",
      });
    }
  }, [errors]);

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      maxWidth={{ base: undefined, md: "300px" }}
    >
      <Text fontSize="xs" mt={4}>
        Phone
      </Text>
      <Input
        placeholder="5106427464"
        type="text"
        border="2px solid #979797"
        borderColor="#979797"
        _hover={{ color: "#777777" }}
        _placeholder={{ color: "#979797" }}
        mt={2}
        {...register("phone", {
          required: true,
          pattern: /^[0-9]*$/i,
        })}
      />
      <Input
        as="input"
        type="submit"
        borderColor="transparent"
        backgroundColor="#F49D37"
        color="white"
        mt={4}
        value="Check Registration"
      />
      <Text fontSize="xs" mt={4} color="gray.400">
        Haven&apos;t RSVP&apos;d? <Link onClick={onSetLogin}>RSVP</Link>
      </Text>
    </Box>
  );
};

export default LoginForm;
