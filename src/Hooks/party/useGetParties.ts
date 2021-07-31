import { useDispatch } from "react-redux";
import useFetch from "use-http";

import { serverUrl } from "@Constants";
import { Party } from "@Models";
import { setParties } from "@Redux";

type UseGetParty = {
  getParties: (setRedux?: boolean) => Promise<Party[] | void>;
  data?: Party[];
  error?: any;
  loading?: boolean;
};

const useGetParties = (): UseGetParty => {
  const dispatch = useDispatch();

  const {
    get,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl);

  const getParties = async (setRedux = false) => {
    const { parties } = await get(`/parties`);

    if (setRedux) dispatch(setParties(parties));

    if (response.ok) {
      return parties;
    }
  };

  return {
    getParties,
    data,
    error,
    loading,
  };
};

export default useGetParties;
