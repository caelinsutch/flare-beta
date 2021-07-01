import { useEffect } from "react";

import { useToast } from "@chakra-ui/toast";
import useFetch from "use-http";

import { serverUrl } from "@Constants";
import { NewReview, User } from "@Models";

type UseReviewUser = {
  reviewUser: (userId: string, review: NewReview) => Promise<User | undefined>;
  loading?: boolean;
  error?: any;
  data?: User;
};

const useReviewUser = (): UseReviewUser => {
  const {
    post,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl);
  const toast = useToast();

  const reviewUser = async (userId: string, review: NewReview) => {
    const { user } = await post(`/user/${userId}/review`, { review });

    if (response.ok) {
      toast({
        status: "success",
        title: "Review submitted!",
        description: "Thanks for your input on this host!",
      });
      return user;
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        status: "error",
        title: "Error submitting review",
      });
    }
  }, [error]);

  return {
    reviewUser,
    loading,
    error,
    data,
  };
};

export default useReviewUser;
