const express = require('express');
const server = express();


const cors = require('cors');
server.use(cors());

const bodyParser = require('body-parser');
server.use(bodyParser.json());


const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log("db Connected")
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String
})

const User = mongoose.model('User', userSchema);


const port = 3000;





server.post('/', async (req, res) => {

  let user = new User()
  user.username = req.body.username;
  user.password = req.body.password;
  const doc = await user.save();

  console.log(doc)
  res.json(doc)

})


server.get('/', async (req, res) => {
  const docs = await User.find({});
  res.json(docs)
})


server.listen(port, () => {
  console.log("server started")
  console.log(`Example app listening at http://localhost:${port}`)
})
