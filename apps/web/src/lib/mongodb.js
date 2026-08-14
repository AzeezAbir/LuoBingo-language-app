import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
if (!uri) {
  throw new Error('Please add MONGODB_URI to your .env file')
}

let client = new MongoClient(uri)
let clientPromise = client.connect()

export default clientPromise
