import { NextApiRequest } from "next";
import { sendText } from "../../Twilio";

const send = async (req: NextApiRequest) => {
  const { message, phoneNumbers } = JSON.parse(req.body);

  if (!message || !phoneNumbers) {
    throw new Error("phoneNumbers and message are required");
  }

  const failedNumbers: string[] = [];

  await Promise.all(
    phoneNumbers.map(async (number: string) => {
      try {
        await sendText(number, message);
      } catch (e) {
        failedNumbers.push(number);
        console.error(e);
      }
    })
  );

  return { status: "ok", failedNumbers };
};

export default send;
