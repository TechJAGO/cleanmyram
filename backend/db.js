//once the index.js line for connection to db is triggered, the code comes to this file and executes it. Here mongoose is a requirement and you define mongoURI as your db connection string.
const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017"

//here you created an arrow function to connect to the database using the mongoose functionality mongoose.connect that you imported in line 2.
const connectToMongo = () => {
mongoose.connect("mongodb://127.0.0.1:27017/", {
 //here we are giving NewUrlParser and UnifiedTopology to true because the old fuctionality to read strings is not true anymore hence we are using new methods here
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
//if the above condition is true, .then method will be executed otherwise .catch will be executed.
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.log("MongoDB connection error: ", err));
};

//since we are using require call hence we have to export the module specifying which part to export.
//here your connectToMongo function will act as a module and will be exposed to the code.
module.exports = connectToMongo