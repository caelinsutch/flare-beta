import { useEffect, useState } from "react";
import { useGetUser } from "./user";
import firebase from "firebase/app";

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
