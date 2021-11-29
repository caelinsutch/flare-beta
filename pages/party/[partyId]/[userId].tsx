import React from "react";

import { Box, Heading, Text } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";

import { getParty } from "@Api";
import { PageContainer } from "@Components";
import { Party, PartyAttendee } from "@Models";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { party } = await getParty(ctx.params?.partyId as string);

    if (!party) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        attendee:
          party?.attendees.find((a) => a.userId === ctx.params?.userId) ?? null,
        party,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

const PartyAttendeePage: React.FC<{ attendee?: PartyAttendee; party: Party }> =
  ({ attendee, party }) => {
    const getBackgroundColor = () => {
      if (attendee) {
        if (party.price.length > 0) {
          if (attendee?.amountPaid && attendee.status === "attending") {
            return "green.400";
          }
          return "yellow.400";
        } else {
          if (attendee.status === "attending") {
            return "green.400";
          }
          return "yellow.400";
        }
      }
      return "red.400";
    };

    return (
      <PageContainer
        minH="100vh"
        backgroundColor={getBackgroundColor()}
        textAlign="center"
        color="white"
      >
        <Text fontWeight="bold" color="white">
          Party: {party.name}
        </Text>
        {attendee ? (
          <Box mt={2}>
            <Text color="white">Name:</Text>
            <Heading size="2xl">{attendee.name}</Heading>
            {attendee?.amountPaid && (
              <Heading size="xl" mt={2}>
                Paid: {attendee.amountPaid / 100}
              </Heading>
            )}
          </Box>
        ) : (
          <Box>
            <Heading>Guest not found</Heading>
          </Box>
        )}
      </PageContainer>
    );
  };

export default PartyAttendeePage;
