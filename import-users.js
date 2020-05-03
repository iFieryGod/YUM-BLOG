const users = require('./data/users.json');
const mongoose = require('mongoose');

const url = 'mongodb://localhost/Yummy';
mongoose.connect(url, { useUnifiedTopology: true,
  useNewUrlParser: true})
 .then(importUsers);

 function importUsers(){

   const usersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    emailAddress: String,
   });

   const User = mongoose.model("User", usersSchema);

   User.insertMany(users)
   .then( () => console.log('inserted'));
 }