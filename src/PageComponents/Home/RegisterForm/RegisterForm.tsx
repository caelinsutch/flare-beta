import { Box, Button, Link, Text, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { serverUrl } from "../../../constants";
import useFetch from "use-http";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Redux";
import { Input } from "../../../Components";

type RegisterFormProps = {
  onSetLogin: () => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onSetLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
  });
  const dispatch = useDispatch();
  const toast = useToast();
  const { post, error, data, loading } = useFetch(serverUrl);

  useEffect(() => {
    if (data?.user) {
      toast({
        status: "success",
        title: "RSVP Confirmed",
      });
      dispatch(setUser(data.user));
      localStorage.setItem("phone", data.user.phone);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast({
        status: "error",
        title: "Error registering!",
        description: data?.error,
      });
    }
  }, [error]);

  const onSubmit = async (submittedData: any) => {
    await post("/register", submittedData);
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      maxWidth={{ base: undefined, md: "300px" }}
      mt={2}
    >
      <Input
        label="Name"
        placeholder="Carol Christ"
        type="text"
        {...register("name", {
          required: true,
        })}
        error={errors.phone ? "Must have a name" : undefined}
      />

      <Input
        label="Phone"
        placeholder="5106427464"
        type="text"
        {...register("phone", {
          required: true,
          pattern: /^[0-9]*$/i,
        })}
        error={
          errors.phone ? "Must have a properly formatted phone #" : undefined
        }
      />
      <Input
        label="IG Handle"
        placeholder="@ucberkeley"
        type="text"
        {...register("instagram", {
          required: true,
        })}
        error={errors.instagram ? "Must submit an Instagram" : undefined}
      />
      <Button
        type="submit"
        borderColor="transparent"
        backgroundColor={
          Object.keys(errors).length > 0 ? "orange.200" : "orange.400"
        }
        pointerEvents={Object.keys(errors).length > 0 ? "none" : undefined}
        color="white"
        _hover={{
          color: "white",
          backgroundColor:
            Object.keys(errors).length > 0 ? undefined : "orange.500",
        }}
        mt={2}
        isLoading={loading}
        width="100%"
      >
        RSVP
      </Button>
      <Text fontSize="xs" mt={2} color="gray.400">
        Already RSVP&apos;d? <Link onClick={onSetLogin}>Check your status</Link>
      </Text>
    </Box>
  );
};
export default RegisterForm;
