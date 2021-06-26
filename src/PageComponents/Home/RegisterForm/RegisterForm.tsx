import { Box, Button, Link, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { serverUrl } from "../../../constants";
import useFetch from "use-http";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Redux";
import { Input, VerifyPhone } from "../../../Components";
import firebase from "firebase";

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

  const [phoneEntry, setPhoneEntry] = useState(true);
  const [phone, setPhone] = useState<string>();
  const [userId, setUserId] = useState<string>();

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
    await post("/register", {
      phone,
      userId,
      ...submittedData,
    });
  };

  const handleVerify = (userId: string, phone: string) => {
    setUserId(userId);
    setPhone(phone);
    setPhoneEntry(false);
  };

  // const user = firebase.auth().currentUser;
  // console.log(user);
  if (phoneEntry) {
    return <VerifyPhone onVerify={handleVerify} />;
  }

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
