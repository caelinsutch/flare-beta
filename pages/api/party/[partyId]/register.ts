import { NextApiRequest, NextApiResponse } from "next";

import { registerUserForParty } from "@Api/Handlers/party";
import { wrapper } from "@Api/Utils";

const UserRegisterParty = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(
    req,
    res,
    "POST",
    async () => {
      const { partyId } = req.query;
      const { userId } = req.body;
      return registerUserForParty(partyId as string, userId as string);
    },
    true
  );

export default UserRegisterParty;
