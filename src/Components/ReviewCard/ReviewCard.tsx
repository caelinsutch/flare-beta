import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { UserReview } from "../../Models/User";

type ReviewCardProps = {
  review: UserReview;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => (
  <Box boxShadow="md" p={4} mt={4}>
    <Text variant="subtitle2">{review.name}</Text>
    <Text>{review.body}</Text>
  </Box>
);

export default ReviewCard;
