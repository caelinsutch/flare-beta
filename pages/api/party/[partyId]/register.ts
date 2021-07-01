import { NextApiRequest, NextApiResponse } from "next";

import { registerUserForParty } from "@Api/Handlers/party";
import { wrapper } from "@Api/Utils";

const UserRegisterParty = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(
    req,
    res,
    "POST",
    async () => {
      const { userId } = req.query;
      const { partyId } = req.body;
      return registerUserForParty(partyId, userId as string);
    },
    true
  );

export default UserRegisterParty;
