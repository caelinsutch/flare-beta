import { GetServerSidePropsContext } from "next";
import nookies from "nookies";

import { firebaseAdmin } from "@Api/Firebase";
import { getUser } from "@Api/Handlers/user";

const authorizeServerSide = async (
  ctx: GetServerSidePropsContext,
  checkAdmin?: boolean
) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    const { uid } = token;

    const { user } = await getUser(uid);

    if (checkAdmin) {
      if (!user?.isAdmin) throw new Error("Must be admin");
    }

    return {
      user,
    };
  } catch (err) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();

    return { props: {} as never };
  }
};

export default authorizeServerSide;
