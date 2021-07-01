import { NextApiRequest, NextApiResponse } from "next";

import { send } from "@Api/Handlers";
import { wrapper } from "@Api/Utils";

const SendHandler = (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "POST", send, true);

export default SendHandler;
