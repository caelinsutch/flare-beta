import React from "react";

import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import { authorizeServerSide } from "@Utils";

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
