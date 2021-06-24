import { Box, Input, Link, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { serverUrl } from "../../../constants";
import useFetch from "use-http";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Redux";

type RegisterFormProps = {
  onSetLogin: () => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onSetLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const toast = useToast();
  const { post, data = undefined, error } = useFetch(serverUrl);

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      if (errors.phone.pattern) {
        toast({
          status: "error",
          title: "Phone must be 9163174484 format!",
        });
      } else {
        toast({
          status: "error",
          title: "Invalid form!",
        });
      }
    }
  }, [errors]);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      toast({
        status: "success",
        title: "RSVP Confirmed",
      });
      dispatch(setUser(data));
      localStorage.setItem("phone", data.phone);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast({
        status: "error",
        title: "Error registering!",
        description: "Note you can only signup once per phone",
      });
    }
  }, [error]);

  const onSubmit = async (data: any) => {
    await post("/register", data);
  };
  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      maxWidth={{ base: undefined, md: "300px" }}
    >
      <Text fontSize="xs" mt={4}>
        Name
      </Text>
      <Input
        placeholder="Carol Christ"
        type="text"
        border="2px solid #979797"
        borderColor="#979797"
        _hover={{ color: "#777777" }}
        _placeholder={{ color: "#979797" }}
        mt={2}
        {...register("name", {
          required: true,
        })}
      />

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
      <Text fontSize="xs" mt={4}>
        IG Handle
      </Text>
      <Input
        placeholder="@ucberkeley"
        type="text"
        border="2px solid #979797"
        borderColor="#979797"
        _hover={{ color: "#777777" }}
        _placeholder={{ color: "#979797" }}
        mt={2}
        {...register("instagram", {
          required: true,
        })}
      />
      <Input
        as="input"
        type="submit"
        borderColor="transparent"
        backgroundColor="#F49D37"
        color="white"
        mt={4}
        value="RSVP"
      />
      <Text fontSize="xs" mt={4} color="gray.400">
        Already RSVP'd? <Link onClick={onSetLogin}>Check your status</Link>
      </Text>
    </Box>
  );
};
export default RegisterForm;
