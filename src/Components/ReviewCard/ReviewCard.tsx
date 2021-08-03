import React from "react";

import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { AiFillDelete } from "react-icons/ai";

import { Review } from "@Models";

type ReviewCardProps = {
  review: Review;
  onDelete?: () => any;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onDelete }) => (
  <Box borderWidth={1} borderColor="gray.400" borderRadius={4} p={4} mt={4}>
    <Flex alignItems="center" justifyContent="space-between" row>
      <Text variant="subtitle2">{review.name}</Text>
      <Box spacing={2} alignItems="center" display="flex" flexDirection="row">
        <Text variant="subtitle3">
          {dayjs(review.createdAt).format("M/D/YYYY h:mm A")}
        </Text>
        {onDelete && (
          <IconButton
            color="red.400"
            variant="ghost"
            aria-label="Delete"
            onClick={onDelete}
            icon={<AiFillDelete />}
          />
        )}
      </Box>
    </Flex>
    <Text mt={2}>{review.body}</Text>
  </Box>
);

export default ReviewCard;
