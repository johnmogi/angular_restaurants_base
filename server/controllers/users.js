 
const express = require("express");
const jwt = require("jsonwebtoken");

const usersLogic = require("../logic/users");
const sendError = require("../helpers/send-error");

const router = express.Router();

// GET http://localhost:3000/api/users/all
router.get("/all", async (request, response) => {
    try {
      const users = await usersLogic.getAllUsersAsync();
      response.json(users);
    } catch (err) {
      sendError(response, err);
    }
  });
  // GET http://localhost:3000/api/users/:id
router.get("/:id", async (request, response) => {
    try {
        const id = +request.params.id
      const user = await usersLogic.getOneUserAsync(id);
      response.json(user);
    } catch (err) {
      sendError(response, err);
    }
  });

  // POST http://localhost:3000/api/users/login
router.post("/login", async (request, response) => {
  const user = request.body
  if (!user.userName || !user.password){
    response.status(500).send("Make sure both user name and password are correct");
    return;
  }
  try {
    const users = await usersLogic.loginUserAsync(user);

    if (!users[0] ){
      response.status(403).send("User does not exist, register a new account?");
      return;
    }
    // Create new Token: 
        const token = jwt.sign({ user }, config.jwt.secretKey, { expiresIn: "30m" });
        // Send back the token to the client: 
        response.json({ user, token });
    // response.json(users);
  } catch (err) {
    sendError(response, err);
  }
});


  module.exports = router;
