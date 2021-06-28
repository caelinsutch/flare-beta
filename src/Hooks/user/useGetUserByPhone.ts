import { User } from "../../Models/User";
import { serverUrl } from "../../constants";
import useFetch from "use-http";
import { setUser } from "../../Redux/Slices";

type UseGetUser = {
  getUserByPhone: (phone: string) => Promise<User | undefined>;
  loading?: boolean;
  error?: any;
  data?: User;
};

const useGetUserByPhone = () => {
  const {
    get,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl);

  const getUserByPhone = async (phone: string) => {
    const { users } = await get(
      `/user/phone?phone=${encodeURIComponent(phone)}`
    );

    if (response.ok) {
      return users;
    }
    return;
  };

  return {
    getUserByPhone,
    data,
    error,
    loading,
  };
};

export default useGetUserByPhone;
