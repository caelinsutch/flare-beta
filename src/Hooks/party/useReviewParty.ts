import { useEffect } from "react";

import { useToast } from "@chakra-ui/react";
import useFetch from "use-http";

import { serverUrl } from "@Constants";
import { NewReview, Party } from "@Models";

type UseReviewParty = () => {
  reviewParty: (
    partyId: string,
    review: NewReview
  ) => Promise<{ party: Party }>;
  data?: { party: Party };
  error?: any;
  loading?: boolean;
};

const useReviewParty: UseReviewParty = () => {
  const {
    post,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl);
  const toast = useToast();

  const reviewParty = async (partyId: string, review: NewReview) => {
    const status = await post(`/party/${partyId}/review`, { review });

    if (response.ok) {
      toast({
        status: "success",
        title: "Review submitted!",
      });
      return status;
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        status: "error",
        title: "Error reviewing party!",
      });
    }
  }, [error]);

  return {
    reviewParty,
    loading,
    error,
    data,
  };
};

export default useReviewParty;
