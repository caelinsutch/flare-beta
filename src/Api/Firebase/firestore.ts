import { firestore } from "./admin";

const userCollection = firestore.collection("users");
const partyCollection = firestore.collection("parties");
const reviewCollection = firestore.collection("reviews");

export { userCollection, partyCollection, reviewCollection };
