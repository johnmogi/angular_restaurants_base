 
const express = require("express");
const restLogic = require("../logic/restaurants");
const sendError = require("../helpers/send-error");

const router = express.Router();
const verifyLoggedIn = require("../middleware/verify-login");

// router.use(verifyLoggedIn);

// GET http://localhost:3000/api/restaurants
router.get("/", async (request, response) => {
    try {
      const rests = await restLogic.getAllRestsAsync();
      response.json(rests);
    } catch (err) {
      sendError(response, err);
    }
  });
  // GET http://localhost:3000/api/restaurants/:id
router.get("/:id", async (request, response) => {
    try {
        const id = +request.params.id
      const item = await restLogic.getOneRestAsync(id);
      response.json(item);
    } catch (err) {
      sendError(response, err);
    }
  });

 // POST http://localhost:3000/api/restaurants/
 router.post("/", async (request, response) => {
  // (title, author, price, genres, image)
   const rest = request.body
   if(!rest.name ){
    response.status(403).json({value: "one of the fields is missing"});
    return;
   }
   try {
    const addedRest = await restLogic.addOneRestAsync(rest);
    response.status(201).json(addedRest);
  } catch (err) {
    sendError(response, err);
  }
});
 // 
 // delete http://localhost:3000/api/restaurants/:id
router.delete("/:id", async (request, response) => {
  try {
    const id = +request.params.id;
    const rest = await restLogic.deleteOneRestAsync(id);
    response.status(200).json(rest);

  } catch (err) {
    sendError(response, err);

  }
});

// PUT http://localhost:3000/api/restaurants/7
router.put("/:id", async (request, response) => {
  try {
      const id = +request.params.id;
      const rest = request.body;
      rest.id = id;
      const updatedRest = await restLogic.updateFullRestAsync(rest);
      
      if(updatedRest === null) {
          response.sendStatus(404);
          return;
      }
      
      response.json(updatedRest);
  }
  catch(err) {
      response.status(500).send(err.message);
  }
});


// PATCH http://localhost:3000/api/restaurants/7
router.patch("/:id", async (request, response) => {
  try {
      const id = +request.params.id;
      const rest = request.body;
      rest.id = id;
      const updatedRest = await restLogic.updatePartialRestAsync(rest);
      
      if(updatedRest === null) {
          response.sendStatus(404);
          return;
      }
      
      response.json(updatedRest);
  }
  catch(err) {
      response.status(500).send(err.message);
  }
});

  module.exports = router;
