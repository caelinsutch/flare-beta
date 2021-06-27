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
      return res.status(200).send(data);
    } catch (e) {
      if (e.name === "404") return res.status(404).send({ message: e.message });
      return res.status(500).send({ error: e.toString() });
    }
  }
};

export default wrapper;
