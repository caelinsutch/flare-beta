import { NextApiRequest, NextApiResponse } from "next";

import { registerUsersForParty, wrapper } from "@Api";

const AddUsersToParty = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(
    req,
    res,
    "POST",
    async () => {
      const { partyId } = req.query;
      const { userIds } = req.body;
      return registerUsersForParty(partyId as string, userIds as string[]);
    },
    true
  );

export default AddUsersToParty;
