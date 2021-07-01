import { useEffect, useState } from "react";
import * as React from "react";

import { Box, Container, Link, Spinner, Text } from "@chakra-ui/react";
import { useGetParty } from "@Hooks/party";
import dayjs from "dayjs";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { PageContainer } from "@Components";
import { Party } from "@Models";

import { getParty } from "@Api/Handlers/party";
import getParties from "@Api/Handlers/party/getParties";

export const getStaticProps: GetStaticProps<any, { partyId: string }> = async ({
  params,
}) => {
  try {
    const { party } = await getParty(params?.partyId as string);
    return {
      props: {
        party,
      },
      revalidate: 1,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths<{ partyId: string }> = async () => {
  const { parties } = await getParties();
  return {
    paths: parties.map((u) => ({ params: { partyId: u.partyId } })),
    fallback: "blocking",
  };
};

const PartyPage: React.FC<{ party?: Party }> = ({ party: initialParty }) => {
  const router = useRouter();
  const { getParty, loading } = useGetParty();

  const [party, setParty] = useState<Party | undefined>(initialParty);

  useEffect(() => {
    if (!router.isReady || party) return;

    const { partyId } = router.query;

    // Get party info
    getParty(partyId as string).then((p) => {
      if (p) setParty(p);
    });
  }, [router.isReady]);

  if (!party) return null;

  return (
    <PageContainer p={4} title={`${party.name} - Hosted with Flare`}>
      {loading && (
        <Box mt={4} textAlign="center" size="xl">
          <Spinner color="orange.500" />
        </Box>
      )}
      {party && (
        <Container>
          <Box>
            <Text variant="title1">{party.name}</Text>
            <Text>
              Hosted by{" "}
              {party.admin.map((user, i) => (
                <Link
                  href={`/user/${user?.url ?? user.userId}`}
                  key={user.userId}
                >
                  {user.name}
                  {party.admin.length > 0 &&
                    i !== party.admin.length - 1 &&
                    ", "}
                </Link>
              ))}
            </Text>
            <Text fontSize="xl" color="gray.500" mt={1}>
              {dayjs(party.date).format("MMM D HH A")} - {party.address}
            </Text>
            {/*            <Box mt={2}>*/}
            {/*              <Markdown>*/}
            {/*                {`*/}
            {/*# Placeholder*/}
            {/*1. Test*/}
            {/*2. Test*/}
            {/*`}*/}
            {/*              </Markdown>*/}
            {/*            </Box>*/}
          </Box>
        </Container>
      )}
    </PageContainer>
  );
};

export default PartyPage;
