import { NextApiRequest } from "next";
import { sendText } from "../../Twilio";

const send = async (req: NextApiRequest) => {
  const { message, phoneNumbers } = JSON.parse(req.body);

  if (!message || !phoneNumbers) {
    throw new Error("phoneNumbers and message are required");
  }

  await Promise.all(
    phoneNumbers.map((number: string) => sendText(number, message))
  );

  return { status: "ok" };
};

export default send;
