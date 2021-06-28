import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { UserReview } from "../../Models/User";
import { AiFillDelete } from "react-icons/ai";

type ReviewCardProps = {
  review: UserReview;
  onDelete?: () => void;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onDelete }) => (
  <Box boxShadow="md" p={4} mt={4}>
    <Flex alignContent="center" justifyContent="space-between" row>
      <Text variant="subtitle2">{review.name}</Text>
      {onDelete && (
        <Box onClick={onDelete}>
          <AiFillDelete />
        </Box>
      )}
    </Flex>
    <Text mt={2}>{review.body}</Text>
  </Box>
);

export default ReviewCard;
