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
  Tag,
  Text,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react";
import AllPromoStats from "@PageComponents/Party/AllPromoStats";
import dayjs from "dayjs";
import { GetServerSidePropsContext } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import nookies from "nookies";
import { AiFillHome, AiOutlineClockCircle } from "react-icons/ai";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from "react-redux";

import { firebaseAdmin, getUser } from "@Api";
import {
  EditPartyModal,
  PageContainer,
  PartyAttendeesModal,
  QrCodeModal,
} from "@Components";
import {
  useDeleteParty,
  useDeleteReview,
  useGetParty,
  useRegisterForParty,
} from "@Hooks";
import { Party, User } from "@Models";
import {
  PaymentSection,
  PromoStats,
  SubmitPartyReviewModal,
} from "@PageComponents";
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
  const { deleteReview } = useDeleteReview();

  const { deleteParty } = useDeleteParty();

  const [party, setParty] = useState<Party | undefined>(initialParty);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: qrModalOpen,
    onOpen: qrModalOnOpen,
    onClose: qrModalOnClose,
  } = useDisclosure();
  const {
    isOpen: editOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: attendeesOpen,
    onOpen: onAttendeesOpen,
    onClose: onAttendeesClose,
  } = useDisclosure();

  const { hasCopied, onCopy } = useClipboard(
    `https://www.plots.party/party/${party?.partyId}`
  );

  useEffect(() => {
    if (!router.isReady) return;

    const { partyId } = router.query;

    if (!editOpen) {
      getParty(partyId as string).then((p) => {
        if (p) setParty(p);
      });
    }
  }, [editOpen]);

  useEffect(() => {
    if (!router.isReady || party) return;

    const { partyId } = router.query;

    // Get party info
    getParty(partyId as string).then((p) => {
      if (p) setParty(p);
    });
  }, [router.isReady]);

  const isPartyAdmin =
    party?.admins.find((u) => u.userId === user?.userId) || user?.isAdmin;

  const handleRegisterForParty = async () => {
    if (!user || !party) return;
    await registerForParty(party.partyId, user.userId, party.private);
    const p = await getParty(party.partyId);
    setParty(p as Party);
  };

  const handleDelete = async () => {
    if (!user || !party) return;
    const res = await deleteParty(party.partyId);
    if (res.status === "ok") await router.push("/");
  };

  if (!party) return null;

  const attendeeInfo = party.attendees.find(
    ({ userId }) => userId === localUser?.userId
  );

  const copyButton = (
    <Button leftIcon={<FaRegCopy />} onClick={onCopy} variant="primary">
      {hasCopied ? "Copied" : "Copy Party Link"}
    </Button>
  );

  const getUserButton = () =>
    attendeeInfo ? (
      attendeeInfo.status === "attending" ? (
        copyButton
      ) : (
        <Tag size="lg" colorScheme="yellow">
          Invite Requested
        </Tag>
      )
    ) : (
      <Button
        onClick={handleRegisterForParty}
        isLoading={registerLoading}
        variant="primary"
      >
        {party?.private ? "Request Invite" : "RSVP"}
      </Button>
    );

  const handleReviewSubmitted = (party: Party) => {
    setParty(party);
    getParty(party.partyId as string).then((p) => {
      if (p) setParty(p);
    });
  };

  const handleReviewDelete = async (reviewId: string) => {
    await deleteReview(reviewId);
    setParty(
      (p) =>
        ({
          ...p,
          reviews: p?.reviews.filter((r) => r.reviewId !== reviewId) ?? [],
        } as Party)
    );
  };

  return (
    <>
      {attendeeInfo && (
        <QrCodeModal
          isOpen={qrModalOpen}
          onClose={qrModalOnClose}
          value={`https://plots.party/party/${party.partyId}/${attendeeInfo.userId}`}
        />
      )}
      <EditPartyModal isOpen={editOpen} onClose={onEditClose} party={party} />
      <SubmitPartyReviewModal
        partyId={party.partyId}
        onReviewSubmitted={handleReviewSubmitted}
        isOpen={isOpen}
        onClose={onClose}
      />
      <PartyAttendeesModal
        isOpen={attendeesOpen}
        onClose={onAttendeesClose}
        party={party}
      />
      <PageContainer
        minH="100vh"
        backgroundSize="cover"
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
        title={`${party.name} - Hosted with Plots`}
        image={party.bannerImage}
      >
        {party && (
          <Container flex={1} maxW="450px" d="flex" flexDir="column">
            <Box>
              <Text variant="title1">{party.name}</Text>
              {!party?.noHost && (
                <Text>
                  Hosted by{" "}
                  {party.admins.map((user, i) => (
                    <NextLink
                      href={`/user/${user?.url ?? user.userId}`}
                      key={user.userId}
                    >
                      <Link>
                        {user.name}
                        {party.admins.length > 0 &&
                          i !== party.admins.length - 1 &&
                          ", "}
                      </Link>
                    </NextLink>
                  ))}
                </Text>
              )}
              {user && attendeeInfo && (
                <Badge
                  my={2}
                  colorScheme={
                    attendeeInfo.status === "attending" ? "green" : "yellow"
                  }
                >
                  {attendeeInfo.status === "attending"
                    ? "Attending"
                    : "Requested"}
                </Badge>
              )}
              <HStack mt={1}>
                <Icon as={AiOutlineClockCircle} color="gray.500" w={5} h={5} />
                <Text fontSize="lg" color="gray.500">
                  {dayjs(party.date).format("MMM D, dddd hh:mm a")}
                </Text>
              </HStack>
              {user && attendeeInfo && attendeeInfo.status === "attending" && (
                <HStack mt={1}>
                  <Icon as={AiFillHome} color="gray.500" w={5} h={5} />
                  <Text fontSize="lg" color="gray.500">
                    {party.address}
                  </Text>
                </HStack>
              )}
            </Box>
            <Divider mt={2} />
            <Box mt={4} whiteSpace="pre-line">
              <Text whiteSpace="pre-line">{party.info}</Text>
            </Box>
            {party.price?.length && !party.disablePayments ? (
              <PaymentSection
                price={party.price}
                amountPaid={attendeeInfo?.amountPaid}
                paidAt={attendeeInfo?.paidAt}
                eventId={party.partyId}
                userId={user?.userId as string}
                promoCodes={party?.promoCodes as string[]}
              />
            ) : null}
            <Box my={4}>
              {isPartyAdmin && (
                <HStack mb={2}>
                  <Button onClick={onAttendeesOpen}>Attendees</Button>
                  <Button onClick={onEditOpen}>Edit Party</Button>
                  {/*<Button*/}
                  {/*  colorScheme="red"*/}
                  {/*  isLoading={deleteLoading}*/}
                  {/*  onClick={handleDelete}*/}
                  {/*>*/}
                  {/*  Delete Party*/}
                  {/*</Button>*/}
                </HStack>
              )}

              <HStack spacing={4}>
                {new Date().valueOf() < new Date(party.date).valueOf() &&
                  (user ? (
                    getUserButton()
                  ) : (
                    <NextLink href={`/?registerParty=${party.partyId}`}>
                      <Button variant="primary">
                        {party.price && party?.price.length > 0
                          ? "RSVP"
                          : "Sign up to RSVP"}
                      </Button>
                    </NextLink>
                  ))}
                {attendeeInfo && <Button onClick={qrModalOnOpen}>QR</Button>}
              </HStack>
            </Box>
            {user?.promoCode && (
              <PromoStats
                promoCode={user.promoCode}
                attendees={party.attendees}
              />
            )}
            {(user?.isAdmin || isPartyAdmin) && (
              <>
                <Divider my={2} />
                <AllPromoStats
                  promoCodes={party?.promoCodes ?? []}
                  attendees={party.attendees}
                />
              </>
            )}
            {/*{new Date().valueOf() > new Date(party.date).valueOf() && (*/}
            {/*  <>*/}
            {/*    <Divider*/}
            {/*      my={*/}
            {/*        new Date().valueOf() > new Date(party.date).valueOf()*/}
            {/*          ? 4*/}
            {/*          : 8*/}
            {/*      }*/}
            {/*    />*/}

            {/*    <Box>*/}
            {/*      <Flex justifyContent="space-between" alignItems="center">*/}
            {/*        <Text variant="title3">Reviews</Text>*/}
            {/*        <Button variant="primary" onClick={onOpen}>*/}
            {/*          Submit Anonymous Review*/}
            {/*        </Button>*/}
            {/*      </Flex>*/}
            {/*      {party.reviews &&*/}
            {/*        party.reviews*/}
            {/*          .sort(*/}
            {/*            (r1, r2) =>*/}
            {/*              new Date(r2.createdAt).valueOf() -*/}
            {/*              new Date(r1.createdAt).valueOf()*/}
            {/*          )*/}
            {/*          .map((r) => (*/}
            {/*            <ReviewCard*/}
            {/*              onDelete={*/}
            {/*                isPartyAdmin*/}
            {/*                  ? () => handleReviewDelete(r.reviewId)*/}
            {/*                  : undefined*/}
            {/*              }*/}
            {/*              review={r}*/}
            {/*              key={r.body + r.createdAt + r.reviewId}*/}
            {/*            />*/}
            {/*          ))}*/}
            {/*    </Box>*/}
            {/*  </>*/}
            {/*)}*/}
          </Container>
        )}
        <Text fontSize="sm" p={4}>
          Issues? Text Caelin @ 9163174484
        </Text>
      </PageContainer>
    </>
  );
};

export default PartyPage;
