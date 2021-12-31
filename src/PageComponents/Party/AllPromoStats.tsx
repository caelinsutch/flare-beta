import React from "react";

import {
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

import { PartyAttendee } from "@Models";

type AllPromoStatsProps = {
  promoCodes: string[];
  attendees: PartyAttendee[];
};

const AllPromoStats: React.FC<AllPromoStatsProps> = ({
  promoCodes,
  attendees,
}) => {
  let promoCodesMap: Record<string, { total: number; numberSales: number }> =
    {};
  promoCodes.forEach(
    (code) =>
      (promoCodesMap = {
        ...promoCodesMap,
        [code]: {
          total: 0,
          numberSales: 0,
        },
      })
  );

  attendees.forEach(({ promoCode, amountPaid }) => {
    if (promoCode && promoCodesMap[promoCode]) {
      promoCodesMap[promoCode].total += amountPaid as number;
      promoCodesMap[promoCode].numberSales += 1;
    }
  });

  return (
    <StatGroup>
      {Object.keys(promoCodesMap).map((promoCode) => (
        <Stat key={promoCode}>
          <StatLabel>Total Revenue from {promoCode}</StatLabel>
          <StatNumber>${promoCodesMap[promoCode].total / 100}</StatNumber>
          <StatHelpText>
            Promo Code used {promoCodesMap[promoCode].numberSales} times
          </StatHelpText>
          <StatHelpText>
            Promoter profit ${(promoCodesMap[promoCode].total * 0.15) / 100}
          </StatHelpText>
        </Stat>
      ))}
    </StatGroup>
  );
};

export default AllPromoStats;
