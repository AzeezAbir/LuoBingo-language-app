import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || import.meta.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please add MONGODB_URI to your .env file");
}

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
});
const clientPromise = client.connect();

export default clientPromise;
