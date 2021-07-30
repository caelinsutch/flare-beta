import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";

import { firebaseAdmin } from "@Api/Firebase";

const wrapper = async (
  req: NextApiRequest,
  res: NextApiResponse,
  method: string,
  handler: (req: NextApiRequest, uid?: string) => Promise<any>,
  isProtected = false
) => {
  if (req.method === method) {
    if (isProtected) {
      const cookies = nookies.get({ req });
      try {
        const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
        const { uid } = token;
        try {
          const data = await handler(req, uid);
          return res.status(200).send(data);
        } catch (e) {
          return res.status(500).send({ error: e.toString() });
        }
      } catch (e) {
        return res.status(401).send({ message: "Please log in!" });
      }
    }
    try {
      const data = await handler(req);
      return res.status(200).send(data);
    } catch (e) {
      if (e.name === "404") return res.status(404).send({ message: e.message });
      return res.status(500).send({ error: e.toString() });
    }
  }
};

export default wrapper;
