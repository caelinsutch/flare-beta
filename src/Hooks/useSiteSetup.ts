import { useEffect, useState } from "react";

import firebase from "firebase/app";
import nookies from "nookies";
import { useDispatch } from "react-redux";

import { User } from "@Models";
import { setUser, setAuth } from "@Redux";

import { useGetUser } from "./user";

const useSiteSetup = (initialUser?: User): boolean => {
  const { getUser } = useGetUser();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(
      `%c
      ___                       ___                       ___     
     /  /\\                     /  /\\          ___        /  /\\    
    /  /::\\                   /  /::\\        /  /\\      /  /:/_   
   /  /:/\\:\\  ___     ___    /  /:/\\:\\      /  /:/     /  /:/ /\\  
  /  /:/~/:/ /__/\\   /  /\\  /  /:/  \\:\\    /  /:/     /  /:/ /::\\ 
 /__/:/ /:/  \\  \\:\\ /  /:/ /__/:/ \\__\\:\\  /  /::\\    /__/:/ /:/\\:\\
 \\  \\:\\/:/    \\  \\:\\  /:/  \\  \\:\\ /  /:/ /__/:/\\:\\   \\  \\:\\/:/~/:/
  \\  \\::/      \\  \\:\\/:/    \\  \\:\\  /:/  \\__\\/  \\:\\   \\  \\::/ /:/ 
   \\  \\:\\       \\  \\::/      \\  \\:\\/:/        \\  \\:\\   \\__\\/ /:/  
    \\  \\:\\       \\__\\/        \\  \\::/          \\__\\/     /__/:/   
     \\__\\/                     \\__\\/                     \\__\\/    
    `,
      "color: orange;"
    );

    console.log(
      "%cLooking to work on a fun project? DM @caelinsutch on insta",
      "color: orange;"
    );

    if (initialUser) dispatch(setUser(initialUser));

    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setAuth(true));
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
