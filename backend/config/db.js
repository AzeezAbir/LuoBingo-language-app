import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });
import mongoose from "mongoose";

const connect = async () => {
  try {
    const connectionString = process.env.MONGO_URI;

    const conn = await mongoose.connect(connectionString, { family: 4 });

    console.log(
      `\x1b[32m|-- ✅ MongoDB Connected: ${conn.connection.host} --|\x1b[0m`,
    );
  } catch (error) {
    console.log(`❌ DataBase Connection Khata: ${error.message}`);
    process.exit(1);
  }
};

export default connect;

// import "dotenv/config.js";
// import mongoose from "mongoose";

// const connect = async () => {
//   try {
//     // const hardcodedUri =
//     //   "mongodb+srv://azeez67911:6P8krrFKmEiXrYr0@m0.ibgfzgr.mongodb.net/skills_dashboard?appName=M0";

//     const mobileNetworkUri =
//       "mongodb://azeez67911:6P8krrFKmEiXrYr0@ac-ibgfzgr-shard-00-00.ibgfzgr.mongodb.net:27017,ac-ibgfzgr-shard-00-01.ibgfzgr.mongodb.net:27017,ac-ibgfzgr-shard-00-02.ibgfzgr.mongodb.net:27017/skills_dashboard?ssl=true&replicaSet=atlas-m0-shard-0&authSource=admin&retryWrites=true&w=majority";

//     const conn = await mongoose.connect(
//       mobileNetworkUri || process.env.MONGO_URI,
//       { family: 4 },
//     );

//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(`❌ DataBase Connection Khata: ${error.message}`);
//     // If you see "querySrv ECONNREFUSED" again, it's likely your WiFi/Network
//     process.exit(1);
//   }
// };

// export default connect;
