import { NextApiRequest, NextApiResponse } from "next";
import { wrapper } from "../../../../src/Api/Utils";
import { registerUserForParty } from "../../../../src/Api/Handlers/party";

const UserRegisterParty = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "POST", async () => {
    const { userId } = req.query;
    const { partyId } = req.body;
    return registerUserForParty(partyId, userId as string);
  });

export default UserRegisterParty;
