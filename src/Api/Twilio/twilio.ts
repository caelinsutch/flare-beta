import { Twilio } from "twilio";
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const number = process.env.TWILIO_NUMBER as string;

const client = new Twilio(accountSid, authToken);

export default client;

export { number };
