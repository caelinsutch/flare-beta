import { NextApiRequest, NextApiResponse } from "next";

import { createParty, wrapper } from "@Api";

const NewParty = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(
    req,
    res,
    "POST",
    () => {
      const { party } = req.body;
      return createParty(party);
    },
    true
  );

export default NewParty;
