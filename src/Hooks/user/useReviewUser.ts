import { NewUserReview, User } from "../../Models/User";
import { serverUrl } from "../../constants";
import useFetch from "use-http";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/toast";

type UseReviewUser = {
  reviewUser: (
    userId: string,
    review: NewUserReview
  ) => Promise<User | undefined>;
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

  const reviewUser = async (userId: string, review: NewUserReview) => {
    const { user } = await post(`/user/${userId}/review`, { review });

    if (response.ok) {
      toast({
        status: "success",
        title: "Review submitted!",
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
