import { useEffect } from "react";

import { useToast } from "@chakra-ui/react";
import useFetch from "use-http";

import { serverUrl } from "@Constants";
import { StatusOk } from "@Models";

type UseRegisterUsersForParty = () => {
  registerUsersForParty: (
    partyId: string,
    userIds: string[]
  ) => Promise<StatusOk | undefined>;
  data?: StatusOk;
  loading?: boolean;
  error?: any;
};

const useRegisterUsersForParty: UseRegisterUsersForParty = () => {
  const {
    post,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl);
  const toast = useToast();

  const registerUsersForParty = async (partyId: string, userIds: string[]) => {
    const status = await post(`/party/${partyId}/addUsers`, { userIds });

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
        title: "Error registering users for party",
      });
    }
  }, [error]);

  return {
    registerUsersForParty,
    loading,
    error,
    data,
  };
};

export default useRegisterUsersForParty;
