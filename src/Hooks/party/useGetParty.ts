import useFetch, { CachePolicies } from "use-http";

import { serverUrl } from "@Constants";
import { Party } from "@Models";

type UseGetParty = {
  getParty: (partId: string) => Promise<Party | void>;
  data?: Party;
  error?: any;
  loading?: boolean;
};

const useGetParty = (): UseGetParty => {
  const {
    get,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl, {
    cachePolicy: CachePolicies.NO_CACHE,
  });

  const getParty = async (partyId: string) => {
    const { party } = await get(`/party/${partyId}`);

    if (response.ok) {
      return party;
    }
  };

  return {
    getParty,
    data,
    error,
    loading,
  };
};

export default useGetParty;
