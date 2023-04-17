//here we are calling a connectToMongo function located in ./db.js and giving it the route and the required tag so programs proceeds only when this is executed.
const connectToMongo = require('./db');
//here we are calling express
const express = require('express')
//since we have already imported the require tag in line 2 we can now call the function and proceed further only after execution.
connectToMongo();
const cors = require('cors');

//here we are giving express command to create app and we have already imported express in line 4 and marked it required so it will proceed only after creating app on the defined port.
const app = express()
const port = 5000

app.use(cors());
//here we use an express.json function to create a middleware in the app, it parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json())

//this will load the main page of my website.
app.get('/', (req,res)=>{
    res.send('Hello Jatin')
})

// here all the routes will be defined or can call it APIs. Here you used app.use and defined an api path i.e on what url it must trigger and then later you passed a require function giving it the route to your auth.js location.
app.use('/api/auth', require('./routes/auth'))

//here you just passing a string giving user the localhost link to connect so you can test your website.
app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`)
})