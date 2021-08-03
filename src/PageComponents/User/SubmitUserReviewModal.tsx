import React from "react";

import {
  Box,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Input } from "@Components";
import { useReviewUser } from "@Hooks";
import { User } from "@Models";

type SubmitReviewProps = {
  userId: string;
  onReviewSubmitted: (user: User) => void;
  isOpen: boolean;
  onClose: () => void;
};

const SubmitUserReviewModal: React.FC<SubmitReviewProps> = ({
  userId,
  onReviewSubmitted,
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { reviewUser, loading } = useReviewUser();

  const onSubmit = async (data: any) => {
    const user = await reviewUser(userId, {
      body: data.text,
      images: [],
      name: data.name !== "" ? data.name : "Anonymous",
    });
    if (user) {
      onReviewSubmitted(user);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={4}>
        <Box as="form" onSubmit={handleSubmit(onSubmit)} mt={2}>
          <Text variant="title3" mb={2}>
            Submit a Review
          </Text>
          <Input
            label="Name (optional)"
            {...register("name", { required: false })}
          />
          <Input
            label="Review"
            area
            {...register("text", { required: true })}
            error={errors.text ? "Review text is required!" : undefined}
          />
          <Button
            variant="primary"
            colorScheme="orange"
            type="submit"
            disabled={Object.keys(errors).length !== 0}
            isLoading={loading}
          >
            Submit
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default SubmitUserReviewModal;
