const mongoose = require('mongoose');
const uri = "mongodb://madhuranoop356_db_user:dtKGwi3Ghxvp93dg@ac-wlzaqk4-shard-00-00.yjtdoc2.mongodb.net:27017,ac-wlzaqk4-shard-00-01.yjtdoc2.mongodb.net:27017,ac-wlzaqk4-shard-00-02.yjtdoc2.mongodb.net:27017/leaddesk-mini?ssl=true&replicaSet=atlas-yxmo8o-shard-0&authSource=admin&retryWrites=true&w=majority";

console.log("Attempting to connect to MongoDB with legacy string...");
mongoose.connect(uri)
  .then(() => {
    console.log("Connected successfully!");
  })
  .catch(err => {
    console.error("Connection error:", err.message);
  })
  .finally(() => {
    process.exit();
  });
