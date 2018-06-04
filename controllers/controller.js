// Node packages for api routes
const express = require('express');
const router = express.Router();


// require the articles model for proper formatting of query
const Article = require('../models/Article.js');

// displays starting template for the search
router.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

// method for getting saved articles
router.get("/api/saved", (req, res) => {
  
  // Query Mongo for the Articles
   Article.find({}, (err, docs)=>{
      if (err) {
        console.log("Error occured "+err);
        res.sendStatus(400);
      }
      // send result as json to be formatted
      else {
        res.json(docs);
      }
   });

});


// when the user wishes to save an article this will trigger
router.post("/api/saved", (req, res)=> {
  
  // creates a new article entry based on the article the user wishes to save
  let entry = new Article (req.body);

  // Save the entry to MongoDB
  entry.save((err, doc)=> {
    // log any errors
    if (err) {
        console.log("Error occured "+err);
        res.sendStatus(400);
    }
    // article will be saved to mongo db
    else {
      res.sendStatus(200);
    }
  });

});


// Route for when user wishes to remove article from the saved list 
router.post("/api/delete/:articleMongoId", (req, res)=> {
  console.log(req.params.articleMongoId)
  Article.findByIdAndRemove(req.params.articleMongoId, (err, todo)=> {
    if (err) {
      console.log("Error occured "+err);     
      res.sendStatus(400);
    } 
    else {
      res.sendStatus(200);
    }
  });

});

// What the server.js will call 
module.exports = router;