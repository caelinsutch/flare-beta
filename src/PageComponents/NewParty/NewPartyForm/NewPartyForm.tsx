import React from "react";

import { Box, Button } from "@chakra-ui/react";
import DateTimePicker from "@Components/DateTimePicker";
import { useForm } from "react-hook-form";

import { Input } from "@Components";

type NewPartyFormData = {
  name: string;
  address: string;
  info: string;
};

const NewPartyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
  });

  const onSubmit = (data: NewPartyFormData) => {
    console.log(data);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        type="text"
        {...register("name", {
          required: true,
        })}
        error={errors.name ? "Must have a name" : undefined}
      />
      <Input
        label="Address"
        type="text"
        {...register("address", {
          required: true,
        })}
        error={errors.address ? "Must have a name" : undefined}
      />
      <Input
        area
        label="Description"
        {...register("description", {
          required: true,
        })}
        error={errors.description ? "Must have a name" : undefined}
      />
      <DateTimePicker
        onChange={(v) => console.log(v)}
        selectedDate={new Date()}
      />
      <Button variant="primary" mx="auto">
        Create Party
      </Button>
    </Box>
  );
};

export default NewPartyForm;
