import useFetch from "use-http";
import { User } from "../Models/User";
import { serverUrl } from "../constants";
import { setUser } from "../Redux/Slices";

type UseSendMessage = {
  sendMessage: (
    phoneNumbers: string[],
    message: string
  ) => Promise<{ status: string; failedNumbers: string[] } | any>;
  loading?: boolean;
  error?: any;
  data?: User;
};

const useSendMessage = (): UseSendMessage => {
  const {
    post,
    data = undefined,
    error,
    loading,
    response,
  } = useFetch(serverUrl);

  const sendMessage = async (phoneNumbers: string[], message: string) => {
    const status = await post(
      `/sms/send`,
      JSON.stringify({
        message,
        phoneNumbers,
      })
    );

    if (response.ok) {
      return status;
    }
    return error;
  };

  return {
    sendMessage,
    loading,
    error,
    data,
  };
};

export default useSendMessage;
