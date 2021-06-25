import useFetch from "use-http";
import { serverUrl } from "../constants";
import { setUsers } from "../Redux";
import { useDispatch } from "react-redux";

const useGetUsers = () => {
  const dispatch = useDispatch();

  const {
    get,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl);

  const getUsers = async () => {
    const { users } = await get(`/users`);

    if (response.ok) {
      dispatch(setUsers(users));
      return users;
    }
  };

  return {
    getUsers,
    data,
    error,
    loading,
  };
};

export default useGetUsers;
