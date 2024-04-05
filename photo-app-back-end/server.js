const express = require("express");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

const users = []


app.post("/user/login", async (req,res) => {

  const username = req.body.name;

  const user = users.find(user => user.name == req.body.name)

  if(user == null){
    return res.status(400).send("User does not exit");
  }

  try{
    if(await bcrypt.compare(req.body.password, user.password)){
      res.send("success")
    }
  } catch {
    res.status(500).send("Incorrect password")
  }
  
  //validate credentials with the database (mongoose)
  //create JWT and return that token

})

app.post("/user/signup", async (req, res) => {

  try {
    const hashedPass = await bcrypt.hash(req.body.pass, 10);
    users.push({name: req.body.name, password: hashedPass});
  } catch (error) {
    console.error(error)
    res.status(500).send();
  }
 
  //encrypt data, add user to database (using mongoose)

})


app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})