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
import { GetServerSidePropsContext } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import nookies from "nookies";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from "react-redux";

import { firebaseAdmin, getUser } from "@Api";
import { PageContainer } from "@Components";
import { useGetParty, useRegisterForParty } from "@Hooks";
import { Party, User } from "@Models";
import { selectUser } from "@Redux";

import { getParty } from "@Api/Handlers/party";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { party } = await getParty(ctx.params?.partyId as string);

    try {
      const cookies = nookies.get(ctx);
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

      const { uid } = token;

      const { user } = await getUser(uid);

      return {
        props: { user, party },
      };
    } catch (err) {
      return {
        props: {
          party,
        },
      };
    }
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

const PartyPage: React.FC<{ party?: Party; user?: User }> = ({
  party: initialParty,
  user: initialUser,
}) => {
  const router = useRouter();

  const localUser = useSelector(selectUser);
  const user = initialUser ?? localUser;

  const { getParty } = useGetParty();
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
            <Text variant="body" mt={2}>
              Problems? DM @caelinsutch on Instagram or text 9163174484
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
