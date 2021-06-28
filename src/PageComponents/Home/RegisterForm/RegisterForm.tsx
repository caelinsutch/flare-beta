import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, VerifyPhone } from "../../../Components";
import { useAddUser } from "../../../Hooks/user";

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
  });
  const { addUser, loading } = useAddUser();

  const [phoneEntry, setPhoneEntry] = useState(true);
  const [phone, setPhone] = useState<string>();
  const [userId, setUserId] = useState<string>();

  const onSubmit = async (submittedData: any) => {
    if (userId && phone) {
      const { instagram } = submittedData;
      const socials = instagram === "" ? {} : { instagram };
      await addUser(userId, {
        phone: phone,
        name: submittedData.name,
        socials,
      });
    }
  };

  const handleVerify = (userId: string, phone: string) => {
    setUserId(userId);
    setPhone(phone);
    setPhoneEntry(false);
  };

  if (phoneEntry) {
    return <VerifyPhone onVerify={handleVerify} register />;
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
        placeholder="ucberkeley"
        type="text"
        {...register("instagram", {
          pattern: /[a-zA-Z]/,
        })}
        error={
          errors.instagram
            ? "Must submit a properly formatted Instagram"
            : undefined
        }
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
        Register
      </Button>
    </Box>
  );
};
export default RegisterForm;
