import React from "react";

import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";

import { PartyAttendee } from "@Models";

type PromoStatsProps = {
  promoCode: string;
  attendees: PartyAttendee[];
};

const promoterCut = 0.15;

const PromoStats: React.FC<PromoStatsProps> = ({ promoCode, attendees }) => {
  const promoAttendees = attendees.filter(
    (a) => a?.amountPaid && a.promoCode === promoCode
  );
  const totalProfit = promoAttendees.reduce(
    (total, prev) => total + (prev?.amountPaid as number) * promoterCut,
    0
  );

  return (
    <Stat>
      <StatLabel>Total Profit</StatLabel>
      <StatNumber>${totalProfit / 100}</StatNumber>
      <StatHelpText>Promo Code used {promoAttendees.length} times</StatHelpText>
    </Stat>
  );
};

export default PromoStats;
