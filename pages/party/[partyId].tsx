import { useEffect, useState } from "react";
import * as React from "react";

import {
  Badge,
  Box,
  Button,
  Container,
  Divider,
  HStack,
  Icon,
  Link,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { GetServerSidePropsContext } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import nookies from "nookies";
import { AiFillHome, AiOutlineClockCircle } from "react-icons/ai";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from "react-redux";

import { firebaseAdmin, getUser } from "@Api";
import { PageContainer } from "@Components";
import { useDeleteParty, useGetParty, useRegisterForParty } from "@Hooks";
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
  const { deleteParty, loading: deleteLoading } = useDeleteParty();

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

  const handleDelete = async () => {
    if (!user || !party) return;
    const res = await deleteParty(party.partyId);
    if (res.status === "ok") await router.push("/");
  };

  if (!party) return null;

  const getUserButton = () =>
    party.attendees.find(({ userId }) => userId === user?.userId) ? (
      <Button leftIcon={<FaRegCopy />} onClick={onCopy} variant="primary">
        {hasCopied ? "Copied" : "Copy Party Link"}
      </Button>
    ) : (
      <Button
        onClick={handleRegisterForParty}
        isLoading={registerLoading}
        variant="primary"
      >
        RSVP
      </Button>
    );

  return (
    <PageContainer
      minH="100vh"
      backgroundSize="cover"
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexDirection="column"
      title={`${party.name} - Hosted with Plots`}
    >
      {party && (
        <Container flex={1} maxW="450px" d="flex" flexDir="column">
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
            {user && party.attendees.find((a) => a.userId === user.userId) && (
              <Badge my={2} colorScheme="green">
                Attending
              </Badge>
            )}
            <HStack mt={1}>
              <Icon as={AiOutlineClockCircle} color="gray.500" w={5} h={5} />
              <Text fontSize="lg" color="gray.500">
                {dayjs(party.date).format("MMM D, dddd hh:mm a")}
              </Text>
            </HStack>
            <HStack mt={1}>
              <Icon as={AiFillHome} color="gray.500" w={5} h={5} />
              <Text fontSize="lg" color="gray.500">
                {party.address}
              </Text>
            </HStack>
          </Box>
          <Divider mt={2} />
          <Box mt={4}>
            <Text>{party.info}</Text>
          </Box>
          <Box mt={4}>
            <HStack spacing={4}>
              {user ? (
                getUserButton()
              ) : (
                <NextLink href={`/?redirectParty=${party.partyId}`}>
                  <Button variant="primary">RSVP</Button>
                </NextLink>
              )}
              {Boolean(party.admin.find((a) => a.userId === user?.userId)) && (
                <Button
                  colorScheme="red"
                  isLoading={deleteLoading}
                  onClick={handleDelete}
                >
                  Delete Party
                </Button>
              )}
            </HStack>
          </Box>
        </Container>
      )}
      <Text fontSize="sm" p={4}>
        Issues? DM @caelinsutch on Insta
      </Text>
    </PageContainer>
  );
};

export default PartyPage;
