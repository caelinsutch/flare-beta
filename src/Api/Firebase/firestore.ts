import { firestore } from "./admin";

const userCollection = firestore.collection("users");
const partyCollection = firestore.collection("parties");

export { userCollection };
