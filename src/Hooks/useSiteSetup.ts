import { useEffect, useState } from "react";

import firebase from "firebase/app";
import nookies from "nookies";

import { useGetUser } from "./user";

const useSiteSetup = (): boolean => {
  const { getUser } = useGetUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(
      `%c
 ________ ___       ________  ________  _______      
|\\  _____\\\\  \\     |\\   __  \\|\\   __  \\|\\  ___ \\     
\\ \\  \\__/\\ \\  \\    \\ \\  \\|\\  \\ \\  \\|\\  \\ \\   __/|    
 \\ \\   __\\\\ \\  \\    \\ \\   __  \\ \\   _  _\\ \\  \\_|/__  
  \\ \\  \\_| \\ \\  \\____\\ \\  \\ \\  \\ \\  \\\\  \\\\ \\  \\_|\\ \\ 
   \\ \\__\\   \\ \\_______\\ \\__\\ \\__\\ \\__\\\\ _\\\\ \\_______\\
    \\|__|    \\|_______|\\|__|\\|__|\\|__|\\|__|\\|_______|
    `,
      "color: orange;"
    );

    console.log(
      "%cLooking to work on a fun project? DM @caelinsutch on insta",
      "color: orange;"
    );

    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        nookies.set(undefined, "token", token, { path: "/" });
        getUser(user.uid, true).then(() => setLoading(false));
      } else {
        nookies.set(undefined, "token", "", { path: "/" });
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebase.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return loading;
};

export default useSiteSetup;
