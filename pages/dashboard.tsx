import React from "react";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import nookies from "nookies";
import { firebaseAdmin } from "../src/Api/Firebase";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    // the user is authenticated!
    const { uid, email } = token;

    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();

    return { props: {} as never };
  }
};

const Dashboard: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => (
  <div>
    <p>{props.message}</p>
  </div>
);

export default Dashboard;
