import { NextApiRequest, NextApiResponse } from "next";
import register from "../../src/Handlers/register";

const Register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, phone, instagram } = req.body;

    try {
      const response = await register({
        name,
        phone,
        instagram,
        points: 0,
      });
      return res.status(200).send(response);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  } else {
    return res.status(501).send({});
  }
};

export default Register;