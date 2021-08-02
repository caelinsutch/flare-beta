import { useEffect } from "react";

import { useToast } from "@chakra-ui/toast";
import useFetch from "use-http";

import { serverUrl } from "@Constants";
import { StatusOk } from "@Models";

type UseDeleteParty = () => {
  deleteParty: (partyId: string) => Promise<StatusOk>;
  loading?: boolean;
  data?: StatusOk;
  error?: any;
};

const useDeleteParty: UseDeleteParty = () => {
  const {
    del,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl);
  const toast = useToast();

  const deleteParty = async (partyId: string) => {
    const res = await del(`/party/${partyId}`);

    if (response.ok) {
      toast({
        status: "success",
        title: "Party deleted!",
      });
      return res;
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        status: "error",
        title: "Error deleting party",
      });
    }
  }, [error]);

  return {
    deleteParty,
    data,
    error,
    loading,
  };
};

export default useDeleteParty;
