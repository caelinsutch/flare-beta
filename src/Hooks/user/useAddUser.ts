import { useEffect } from "react";

import { useToast } from "@chakra-ui/react";
import { setUser } from "@Redux/Slices";
import { useDispatch } from "react-redux";
import useFetch from "use-http";

import { serverUrl } from "@Constants";
import { NewUser, User } from "@Models";

type UseAddUser = {
  addUser: (userId: string, user: NewUser) => Promise<User | undefined>;
  loading?: boolean;
  error?: any;
  data?: User;
};

const useAddUser = (): UseAddUser => {
  const toast = useToast();
  const dispatch = useDispatch();

  const {
    post,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl);

  useEffect(() => {
    if (data?.user) {
      toast({
        status: "success",
        title: "User Registered",
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast({
        status: "error",
        title: "Error registering!",
        description: data?.error,
      });
    }
  }, [error]);

  const addUser = async (userId: string, newUser: NewUser) => {
    const { user } = await post("/user", {
      ...newUser,
      userId,
    });

    if (response.ok) {
      dispatch(setUser(user));

      return user;
    }
  };

  return {
    addUser,
    data,
    error,
    loading,
  };
};

export default useAddUser;
