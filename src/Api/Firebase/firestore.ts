import { firestore } from "./admin";

const userCollection = firestore.collection("users-v2");

export { userCollection };
