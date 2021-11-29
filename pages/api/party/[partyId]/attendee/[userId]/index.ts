import { NextApiRequest, NextApiResponse } from "next";

import { changeUserStatus, wrapper } from "@Api";

const Attendee = async (req: NextApiRequest, res: NextApiResponse) => {
  await wrapper(req, res, "PATCH", () => {
    const { partyId, userId } = req.query;
    const { status } = req.body;
    return changeUserStatus(partyId as string, userId as string, status as any);
  });
};

export default Attendee;
