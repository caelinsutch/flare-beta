import { useDispatch } from "react-redux";
import useFetch from "use-http";

import { serverUrl } from "@Constants";
import { deleteUsers } from "@Redux";

type UseDeleteUsers = {
  deleteUsers: (userIds: string[]) => Promise<string>;
  loading?: boolean;
  error?: any;
  data?: any;
};

const useDeleteUsers = (): UseDeleteUsers => {
  const dispatch = useDispatch();
  const { del, response, loading, error, data } = useFetch(serverUrl);

  const deleteUsersHandler = async (userIds: string[]) => {
    const { userIds: res } = await del("/users", { userIds });

    if (response.ok) {
      dispatch(deleteUsers(userIds));
      return res;
    }
  };

  return {
    deleteUsers: deleteUsersHandler,
    loading,
    error,
    data,
  };
};

export default useDeleteUsers;
