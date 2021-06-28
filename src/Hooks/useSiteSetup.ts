import { useEffect, useState } from "react";
import { useGetUser } from "./user";
import firebase from "firebase/app";

const useSiteSetup = (): boolean => {
  const { getUser } = useGetUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        getUser(user.uid, true).then(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  return loading;
};

export default useSiteSetup;
