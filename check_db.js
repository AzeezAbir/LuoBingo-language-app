const { MongoClient } = require('mongodb');

const uri = "mongodb://azeez67911:AlEn0qwndllO2K9H@ac-lsswpes-shard-00-00.ibgfzgr.mongodb.net:27017,ac-lsswpes-shard-00-01.ibgfzgr.mongodb.net:27017,ac-lsswpes-shard-00-02.ibgfzgr.mongodb.net:27017/LuoBingo?ssl=true&replicaSet=atlas-13rwtt-shard-0&authSource=admin&retryWrites=true&w=majority&appName=M0";

async function main() {
  console.log("Connecting to MongoDB...");
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000
  });

  try {
    await client.connect();
    console.log("Connected successfully!");
    const db = client.db("LuoBingo");
    
    const collections = ["words", "mcqs", "tiles", "translate"];
    for (const colName of collections) {
      const count = await db.collection(colName).countDocuments();
      console.log(`Collection "${colName}" has ${count} documents.`);
    }
  } catch (err) {
    console.error("Connection failed:", err);
  } finally {
    await client.close();
  }
}

main();
