const router = require("express").Router();
const multer = require("multer");
const risksModel = require("../models/riskmodel");
const TokenChecker = require("../TokenChecker");
const issuemodel = require("../models/issuemodel");

const ts = Date.now();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//create first route --add Todo Item to database
router.post("/api/risk", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        console.log(req.body); //req.body is the data that we are sending to the server

        const isIssueExist = await issuemodel.findById(req.body.issue_id);
        if (!isIssueExist) {
          return res.status(404).json({ ErrorMsg: "Issue not found" });
        }else{

          const newItem = new risksModel({
            issue_id: req.body.issue_id, // issue_id is the code of the risk 
            risk_code: req.body.risk_code, // risk_code is the code of the risk 
            risk_type: req.body.risk_type, // risk_type is the type of the risk
            probability: req.body.probability, // probability is the probability of the risk happening 
            impact: req.body.impact, // impact is the impact of the risk happening 
            risk_owner: req.body.risk_owner, // risk_owner is the owner of the risk 
            risk_status: req.body.risk_status, // risk_status is the status of the risk
            date: ts,  //ts is the timestamp
            complete: false,
            userId: tokenResult.userId,
          });
          //save this item in database
          const saveItem = await newItem.save();
          console.log(saveItem);
  
          res.status(200).json(saveItem);

        }
      
        // console.log("is issue exist? > ",JSON.stringify(isIssueExist))
      } else {
        res.status(401).json({ ErrorMsg: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undefined Auth Token" });
    }
  } catch (err) {
    res.json(err);
  }
});

// get All Item from database
router.get("/api/risk", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const allTodoItems = await risksModel.find({
          userId: tokenResult.userId,
        });
        res.status(200).json(allTodoItems);
      } else {
        res.status(401).json({ ErrorMsg: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undefined Auth Token" });
    }
  } catch (err) {
    res.json(err);
  }
});

//Get by id route
router.get("/api/risk/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const theTodo = await risksModel.findById(req.params.id, {});
        res.status(200).json(theTodo);
      } else {
        res.status(401).json({ ErrorMsg: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undefined Auth Token" });
    }
  } catch (err) {
    res.json(err);
  }
});

//update item
router.put("/api/risk/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the item by its id and update it
        const updateData = {
          ...req.body,
        };
        const updateItem = await risksModel.findByIdAndUpdate(req.params.id, {
          $set: updateData,
        });
        const allTodoItems = await risksModel.find({
          userId: tokenResult.userId,
        });
        res.status(200).json({ updateItem, allTodoItems });
      } else {
        res.status(401).json({ ErrorMsg: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undefined Auth Token" });
    }
  } catch (err) {
    res.json(err);
  }
});

//Delete item from database
router.delete("/api/risk/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the item by its id and delete it
        const deleteItem = await risksModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Item Deleted" });
      } else {
        res.status(401).json({ ErrorMsg: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undefined Auth Token" });
    }
  } catch (err) {
    res.json(err);
  }
});

//export router
module.exports = router;
