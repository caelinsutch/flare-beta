import React from "react";

import { Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
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
      <HStack spacing={2}>
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
      </HStack>
    </Flex>
    <Text mt={2}>{review.body}</Text>
  </Box>
);

export default ReviewCard;
