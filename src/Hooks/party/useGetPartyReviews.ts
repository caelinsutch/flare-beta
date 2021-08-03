import useFetch from "use-http";

import { serverUrl } from "@Constants";
import { Review } from "@Models";

type UseGetPartyReviews = () => {
  getPartyReviews: (partyId: string) => Promise<{ reviews: Review[] }>;
  loading?: boolean;
  error?: any;
  data?: { review: Review };
};

const useGetPartyReviews: UseGetPartyReviews = () => {
  const {
    get,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl);

  const getPartyReviews = async (partyId: string) => {
    const res = await get(`/party/${partyId}/reviews`);
    if (response.ok) {
      return res;
    }
  };

  return {
    getPartyReviews,
    data,
    error,
    loading,
  };
};

export default useGetPartyReviews;
