import React from "react";

import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";

import { Review } from "@Models";

type ReviewCardProps = {
  review: Review;
  onDelete?: () => any;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onDelete }) => (
  <Box boxShadow="md" p={4} mt={4}>
    <Flex alignContent="center" justifyContent="space-between" row>
      <Text variant="subtitle2">{review.name}</Text>
      {onDelete && (
        <IconButton
          variant="ghost"
          aria-label="Delete"
          onClick={onDelete}
          icon={<AiFillDelete />}
        />
      )}
    </Flex>
    <Text mt={2}>{review.body}</Text>
  </Box>
);

export default ReviewCard;
