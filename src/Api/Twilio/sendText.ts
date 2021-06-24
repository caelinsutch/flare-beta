import client, { number } from "./twilio";

const sendText = (to: string, body: string) =>
  client.messages.create({
    body,
    from: number,
    to,
  });

export default sendText;
