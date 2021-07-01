import { useDispatch } from "react-redux";
import useFetch from "use-http";

import { serverUrl } from "@Constants";
import { User } from "@Models";
import { setUser } from "@Redux";

type UseGetUser = {
  getUser: (userId: string, currentUser?: boolean) => Promise<User | undefined>;
  loading?: boolean;
  error?: any;
  data?: User;
};

const useGetUser = (): UseGetUser => {
  const {
    get,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl);
  const dispatch = useDispatch();

  const getUser = async (userId: string, currentUser = false) => {
    const { user } = await get(`/user/${userId}`);

    if (response.ok) {
      if (currentUser) dispatch(setUser(user));
      return user;
    }
  };

  return {
    getUser,
    data,
    error,
    loading,
  };
};

export default useGetUser;
