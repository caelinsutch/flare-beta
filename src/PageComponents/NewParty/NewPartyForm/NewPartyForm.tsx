import React from "react";

import { Box, Button } from "@chakra-ui/react";
import DateTimePicker from "@Components/DateTimePicker";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { Input } from "@Components";
import { useCreateParty } from "@Hooks";
import { NewParty } from "@Models";
import { selectUser } from "@Redux";

type NewPartyFormData = {
  name: string;
  address: string;
  info: string;
  date: number;
};

const NewPartyForm: React.FC = () => {
  const router = useRouter();
  const user = useSelector(selectUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    reValidateMode: "onChange",
  });

  const { createParty, loading } = useCreateParty();

  const onSubmit = async (data: NewPartyFormData) => {
    if (!user) return;
    const newParty: NewParty = {
      admin: [user?.userId],
      address: data.address,
      info: data.info,
      name: data.name,
      date: data.date,
    };
    const res = await createParty(newParty);

    if (res) {
      router.push(`/party/${res.party.partyId}`);
    }
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
        {...register("info", {
          required: true,
        })}
        error={errors.description ? "Must have a name" : undefined}
      />
      <Controller
        name="date"
        control={control}
        defaultValue={new Date()}
        render={({ field: { value, onChange } }) => (
          <DateTimePicker onChange={onChange} selectedDate={value} />
        )}
      />

      <Button
        variant="primary"
        mx="auto"
        mt={4}
        type="submit"
        disabled={Object.keys(errors).length > 0}
        isLoading={loading}
      >
        Create Party
      </Button>
    </Box>
  );
};

export default NewPartyForm;
