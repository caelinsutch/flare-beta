import useFetch from "use-http";
import { useDispatch } from "react-redux";
import { User } from "../Models/User";
import { setUser } from "../Redux";
import { serverUrl } from "../constants";

type UseGetUser = {
  getUser: (phone: string) => Promise<User | undefined>;
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

  const getUser = async (phone: string) => {
    const user = await get(`/user/${phone}`);
    if (response.ok) {
      dispatch(setUser(user));
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
