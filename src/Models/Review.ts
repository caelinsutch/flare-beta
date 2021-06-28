export type Review = {
  name?: string;
  body: string;
  images?: string[];
  createdAt: number;
  userId: string;
  deleted?: boolean;
  deletedAt?: number;
  reviewId: string;
};

export type NewReview = Omit<Review, "createdAt" | "userId" | "reviewId">;
export type NewReviewDbo = Omit<Review, "reviewId">;
