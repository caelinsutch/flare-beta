import { useEffect } from "react";

import { useToast } from "@chakra-ui/react";
import useFetch, { CachePolicies } from "use-http";

import { serverUrl } from "@Constants";
import { PartyAttendee, StatusOk } from "@Models";

type UseUpdatePartyAttendeeStatus = () => {
  updatePartyAttendeeStatus: (
    partyId: string,
    userId: string,
    status: PartyAttendee["status"]
  ) => Promise<StatusOk>;
  data?: StatusOk;
  error?: any;
  loading?: boolean;
};

const useUpdatePartyAttendeeStatus: UseUpdatePartyAttendeeStatus = () => {
  const {
    patch,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl, {
    cachePolicy: CachePolicies.NO_CACHE,
  });
  const toast = useToast();

  const updatePartyAttendeeStatus = async (
    partyId: string,
    userId: string,
    status: PartyAttendee["status"]
  ) => {
    const resultStatus = await patch(`/party/${partyId}/attendee/${userId}`, {
      status,
    });

    if (response.ok) {
      toast({
        status: "success",
        title: "Party attendee status updated!",
      });
      return resultStatus;
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        status: "error",
        title: "Error updating party status!",
      });
    }
  }, [error]);

  return {
    updatePartyAttendeeStatus,
    loading,
    error,
    data,
  };
};

export default useUpdatePartyAttendeeStatus;
