import { useEffect } from "react";

import { useToast } from "@chakra-ui/toast";
import { useFetch } from "use-http";

import { serverUrl } from "@Constants";
import { StatusOk } from "@Models";

type UseMarkUserPaid = () => {
  markUserPaid: (
    partyId: string,
    userId: string,
    amountPaid: number,
    orderId: string,
    promoCode?: string
  ) => Promise<StatusOk>;
  data?: StatusOk;
  error?: any;
  loading?: boolean;
};

const useMarkUserPaid: UseMarkUserPaid = () => {
  const {
    post,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl);
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        status: "error",
        title: "Error marking payment as completed, screenshot this :(",
      });
    }
  }, []);

  const markUserPaid = async (
    partyId: string,
    userId: string,
    amountPaid: number,
    orderId: string,
    promoCode?: string
  ) => {
    const status = await post(`/party/${partyId}/attendee/${userId}/paid`, {
      amountPaid,
      orderId,
      promoCode,
    });
    if (response.ok) {
      return status;
    }
  };

  return {
    markUserPaid,
    data,
    error,
    loading,
  };
};

export default useMarkUserPaid;
