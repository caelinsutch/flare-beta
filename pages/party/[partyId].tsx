import { useEffect, useState } from "react";
import * as React from "react";

import {
  Box,
  Button,
  Container,
  Link,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { GetStaticPaths, GetStaticProps } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from "react-redux";

import { PageContainer } from "@Components";
import { useGetParty, useRegisterForParty } from "@Hooks";
import { Party } from "@Models";
import { selectUser } from "@Redux";

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

  const user = useSelector(selectUser);

  const { getParty, loading } = useGetParty();
  const { registerForParty, loading: registerLoading } = useRegisterForParty();

  const [party, setParty] = useState<Party | undefined>(initialParty);

  const { hasCopied, onCopy } = useClipboard(
    `https://flaresocial.app/party/${party?.partyId}`
  );

  useEffect(() => {
    if (!router.isReady || party) return;

    const { partyId } = router.query;

    // Get party info
    getParty(partyId as string).then((p) => {
      if (p) setParty(p);
    });
  }, [router.isReady]);

  const handleRegisterForParty = async () => {
    if (!user || !party) return;
    await registerForParty(party.partyId, user.userId);
    const p = await getParty(party.partyId);
    setParty(p as Party);
  };

  if (!party) return null;

  const getUserButton = () =>
    party.attendees.find(({ userId }) => userId === user?.userId) ? (
      <Button leftIcon={<FaRegCopy />} onClick={onCopy}>
        {hasCopied ? "Copied" : "Copy Party Link"}
      </Button>
    ) : (
      <Button onClick={handleRegisterForParty} isLoading={registerLoading}>
        RSVP
      </Button>
    );

  return (
    <PageContainer p={4} title={`${party.name} - Hosted with Plots`}>
      {party && (
        <Container>
          <Box>
            <Text variant="title1">{party.name}</Text>
            <Text>
              Hosted by{" "}
              {party.admin.map((user, i) => (
                <NextLink
                  href={`/user/${user?.url ?? user.userId}`}
                  key={user.userId}
                >
                  <Link>
                    {user.name}
                    {party.admin.length > 0 &&
                      i !== party.admin.length - 1 &&
                      ", "}
                  </Link>
                </NextLink>
              ))}
            </Text>
            <Text fontSize="xl" color="gray.500" mt={1}>
              {dayjs(party.date).format("MMM D HH A")} - {party.address}
            </Text>
          </Box>
          <Box mt={4}>
            {user ? (
              getUserButton()
            ) : (
              <NextLink href="/">
                <Button>Signup for Plots to Access</Button>
              </NextLink>
            )}
          </Box>
        </Container>
      )}
    </PageContainer>
  );
};

export default PartyPage;
