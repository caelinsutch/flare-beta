import { NextApiRequest, NextApiResponse } from "next";

const wrapper = async (
  req: NextApiRequest,
  res: NextApiResponse,
  method: string,
  handler: (req: NextApiRequest) => Promise<any>
) => {
  if (req.method === method) {
    try {
      const data = await handler(req);
      res.status(200).send(data);
    } catch (e) {
      return res.status(500).send({ error: e.toString() });
    }
  }
};

export default wrapper;
