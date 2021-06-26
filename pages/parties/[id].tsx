import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Party } from "../../src/Models/Party";

const PartyPage = () => {
  const router = useRouter();

  const [party, setParty] = useState<Party>();

  useEffect(() => {
    if (!router.isReady) return;

    const { id } = router.query;

    // Get party info
  }, [router.isReady]);
};

export default PartyPage;
