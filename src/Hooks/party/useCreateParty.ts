import { useEffect } from "react";

import { useToast } from "@chakra-ui/toast";
import useFetch from "use-http";

import { serverUrl } from "@Constants";
import { NewParty, Party } from "@Models";

type UseCreateParty = () => {
  createParty: (newParty: NewParty) => Promise<{ party: Party }>;
  loading?: boolean;
  data?: { party: Party };
  error?: any;
};

const useCreateParty: UseCreateParty = () => {
  const {
    post,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl);
  const toast = useToast();

  const createParty = async (party: NewParty) => {
    const res = await post(`/party`, { party });

    if (response.ok) {
      toast({
        status: "success",
        title: "Party created!",
      });
      return res;
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
    createParty,
    loading,
    data,
    error,
  };
};

export default useCreateParty;
