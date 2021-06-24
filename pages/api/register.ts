import { NextApiRequest, NextApiResponse } from "next";
import register from "../../src/Api/Handlers/register";

const Register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, phone, instagram } = req.body;

    try {
      const user = await register({
        name,
        phone,
        instagram,
        points: 0,
      });

      return res.status(200).send({ user });
    } catch (e) {
      return res.status(500).send({ error: e.toString() });
    }
  } else {
    return res.status(501).send({});
  }
};

export default Register;
