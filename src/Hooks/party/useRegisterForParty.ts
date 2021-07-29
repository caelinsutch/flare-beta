import { useEffect } from "react";

import { useToast } from "@chakra-ui/react";
import useFetch from "use-http";

import { serverUrl } from "@Constants";
import { StatusOk } from "@Models";

type UseRegisterForParty = () => {
  registerForParty: (
    partyId: string,
    userId: string
  ) => Promise<StatusOk | undefined>;
  data?: StatusOk;
  loading?: boolean;
  error?: any;
};

const useRegisterForParty: UseRegisterForParty = () => {
  const {
    post,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl);
  const toast = useToast();

  const registerForParty = async (partyId: string, userId: string) => {
    const status = await post(`/party/${partyId}/register`, { userId });

    if (response.ok) {
      toast({
        status: "success",
        title: "Registered for party!",
      });
      return status;
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        status: "error",
        title: "Error registering user for party",
      });
    }
  }, [error]);

  return {
    registerForParty,
    loading,
    error,
    data,
  };
};

export default useRegisterForParty;
