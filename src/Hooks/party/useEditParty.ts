import useFetch from "use-http";

import { serverUrl } from "@Constants";
import { Party, StatusOk } from "@Models";

type UseEditParty = () => {
  editParty: (
    partyId: string,
    party: Partial<Omit<Party, "partyId">>
  ) => Promise<StatusOk>;
  data?: StatusOk;
  error?: any;
  loading?: boolean;
};

const useEditParty: UseEditParty = () => {
  const {
    patch,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl);

  const editParty = async (
    partyId: string,
    party: Partial<Omit<Party, "partyId">>
  ) => {
    const status = await patch(`/party/${partyId}`, {
      party,
    });

    if (response.ok) {
      return status;
    }
  };

  return {
    editParty,
    data,
    error,
    loading,
  };
};

export default useEditParty;
