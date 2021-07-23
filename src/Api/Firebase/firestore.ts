import { firestore } from "./admin";

const userCollection = firestore.collection("users-v2");
const partyCollection = firestore.collection("parties");

export { userCollection };
