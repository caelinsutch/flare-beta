import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Party } from "../../src/Models/Party";
import { useGetParty } from "../../src/Hooks/party";
import { Markdown, PageContainer } from "../../src/Components";
import * as React from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

const PartyPage = () => {
  const router = useRouter();
  const { getParty, loading } = useGetParty();

  const [party, setParty] = useState<Party>();

  useEffect(() => {
    if (!router.isReady) return;

    const { partyId } = router.query;

    // Get party info
    getParty(partyId as string).then((p) => {
      if (p) setParty(p);
    });
  }, [router.isReady]);

  return (
    <PageContainer p={4}>
      {loading && (
        <Box mt={4} textAlign="center" size="xl">
          <Spinner color="orange.500" />
        </Box>
      )}
      {party && (
        <Box>
          <Text fontSize="3xl" fontWeight="bold">
            {party.name}
          </Text>
          <Text fontSize="xl" color="gray.500">
            {dayjs(party.date).format("MMM D HH A")} - {party.address}
          </Text>
          <Box>
            <Markdown>
              {`
# Placeholder
1. Test
2. Test
`}
            </Markdown>
          </Box>
        </Box>
      )}
    </PageContainer>
  );
};

export default PartyPage;
