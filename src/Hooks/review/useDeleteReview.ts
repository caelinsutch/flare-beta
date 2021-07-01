import { useEffect } from "react";

import { useToast } from "@chakra-ui/toast";
import useFetch from "use-http";

import { serverUrl } from "@Constants";
import { Review } from "@Models";

type UseDeleteReview = {
  deleteReview: (reviewId: string) => Promise<Review | undefined>;
  loading?: boolean;
  error?: any;
  data?: { review: Review };
};

const useDeleteReview = (): UseDeleteReview => {
  const {
    del,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl);
  const toast = useToast();

  const deleteReview = async (reviewId: string) => {
    const { review } = await del(`/review/${reviewId}`);

    if (response.ok) {
      toast({
        status: "success",
        title: "Review deleted!",
      });
      return review;
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        status: "error",
        title: "Error deleting review",
      });
    }
  }, [error]);

  return {
    deleteReview,
    data,
    error,
    loading,
  };
};

export default useDeleteReview;
