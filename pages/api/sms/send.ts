import { NextApiRequest, NextApiResponse } from "next";
import { wrapper } from "../../../src/Api/Utils";
import { send } from "../../../src/Api/Handlers";

const SendHandler = (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "POST", send, true);

export default SendHandler;
