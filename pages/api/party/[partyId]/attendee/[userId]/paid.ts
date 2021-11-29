import { NextApiRequest, NextApiResponse } from "next";

import { markUserPaid, wrapper } from "@Api";

const MarkUserPaid = async (req: NextApiRequest, res: NextApiResponse) => {
  await wrapper(req, res, "POST", () => {
    const { partyId, userId } = req.query;
    const { amountPaid, orderId } = req.body;

    return markUserPaid(
      partyId as string,
      userId as string,
      parseInt(amountPaid, 10),
      orderId as string
    );
  });
};

export default MarkUserPaid;
