import React from "react";

import authorizeServerSide from "@Utils/authorizeServerSide";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { user } = await authorizeServerSide(ctx);

  return { props: { user } };
};

const Dashboard: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => (
  <div>
    <p>{props.user?.name}</p>
  </div>
);

export default Dashboard;
