import { useEffect } from "react";

import { useToast } from "@chakra-ui/react";
import { useGetUser } from "@Hooks/user";
import { useSelector } from "react-redux";
import useFetch from "use-http";

import { serverUrl } from "@Constants";
import { StatusOk } from "@Models";
import { selectUser } from "@Redux";

type UseRegisterForParty = () => {
  registerForParty: (
    partyId: string,
    userId: string,
    waitlist?: boolean
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

  const { getUser } = useGetUser();
  const user = useSelector(selectUser);

  const registerForParty = async (
    partyId: string,
    userId: string,
    waitlist?: boolean
  ) => {
    const status = await post(`/party/${partyId}/register`, { userId });

    if (response.ok) {
      toast({
        status: "success",
        title: waitlist ? "Request sent for party!" : "Registered for party!",
      });
      if (user) getUser(user?.userId, true);
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
