import { firestore } from "./admin";

const userCollection = firestore.collection("user");

export { userCollection };
