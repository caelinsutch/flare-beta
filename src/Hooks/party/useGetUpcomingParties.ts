import useFetch from "use-http";

import { serverUrl } from "@Constants";
import { Party } from "@Models";

type UseGetUpcomingParties = () => {
  getUpcomingParties: () => Promise<{ parties: Party[] } | void>;
  data?: { parties: Party[] };
  error?: any;
  loading?: boolean;
};

const useGetUpcomingParties: UseGetUpcomingParties = () => {
  const {
    get,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl);

  const getUpcomingParties = async () => {
    const { parties } = await get(`/parties/upcoming`);

    if (response.ok) {
      return parties;
    }
  };

  return {
    getUpcomingParties,
    data,
    error,
    loading,
  };
};

export default useGetUpcomingParties;
