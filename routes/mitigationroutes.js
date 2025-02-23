const router = require("express").Router();
const multer = require("multer");
const risksModel = require("../models/riskmodel");
const TokenChecker = require("../TokenChecker");
const mitigationmodel = require("../models/mitigationmodel");
const usermodel = require("../models/usermodel");

const ts = Date.now();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//create first route --add Risk to database
router.post("/api/risk", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        console.log(req.body); //req.body is the data that we are sending to the server

        const isIssueExist = await risksModel.findById(req.body.risk_id);
        const isOwnerExist = await usermodel.findById(req.body.risk_owner);
        if (!isIssueExist) {
          return res.status(404).json({ ErrorMsg: "Issue not found" });
        } else {
          if (!isOwnerExist) {
            return res.status(404).json({ ErrorMsg: "Owner not found" });
          } else {
            const newItem = new mitigationmodel({
              risk_id: req.body.risk_id, // risk_id is the code of the risk
              risk_code: req.body.risk_code, // risk_code is the code of the risk
              risk_type: req.body.risk_type, // risk_type is the type of the risk
              probability: req.body.probability, // probability is the probability of the risk happening
              impact: req.body.impact, // impact is the impact of the risk happening
              risk_owner: req.body.risk_owner, // risk_owner is the owner of the risk
              risk_status: req.body.risk_status, // risk_status is the status of the risk
              date: ts, //ts is the timestamp
              complete: false,
              userId: tokenResult.userId,
            });
            //save this item in database
            const saveItem = await newItem.save();
            console.log(saveItem);

            res.status(200).json(saveItem);
          }
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

// get All Risks from database
router.get("/api/risk", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      if (tokenResult) {
        try {
          let allRisks = await mitigationmodel.find({});
          if (!allRisks) {
            return res.status(404).json({ message: "No risks found" });
          }
          
          const risksWithIssues = await Promise.all(
            allRisks.map(async (risk) => {
              try {
                const [issue, owner] = await Promise.all([
                  risksModel.findById(risk.risk_id).select('issue_title').lean(),
                  usermodel.findById(risk.risk_owner).select('fullname email naam').lean()
                ]);

                if (!issue) throw new Error(`Issue not found for risk ${risk._id}`);
                if (!owner) throw new Error(`Owner not found for risk ${risk._id}`);

                return {
                  ...risk.toObject(),
                  issue_details: issue,
                  owner_details: owner
                };
              } catch (innerError) {
                console.error(`Error processing risk ${risk._id}:`, innerError);
                return {
                  ...risk.toObject(),
                  issue_details: null,
                  owner_details: null,
                  error: innerError.message
                };
              }
            })
          );

          res.status(200).json(risksWithIssues);
        } catch (dbError) {
          console.error("Database operation failed:", dbError);
          res.status(500).json({ 
            message: "Failed to fetch risks data",
            error: dbError.message 
          });
        }
      } else {
        res.status(401).json({ message: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ message: "Undefined Auth Token" });
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ 
      message: "Internal server error",
      error: err.message 
    });
  }
});

//Get by id route
router.get("/api/risk/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      if (tokenResult) {
        try {
          const risk = await mitigationmodel.findById(req.params.id);
          if (!risk) {
            return res.status(404).json({ message: "Risk not found" });
          }

          const [issue, owner] = await Promise.all([
            risksModel.findById(risk.risk_id).select('issue_title').lean(),
            usermodel.findById(risk.risk_owner).select('fullname email naam').lean()
          ]);

          if (!issue) {
            return res.status(404).json({ message: "Associated issue not found" });
          }
          if (!owner) {
            return res.status(404).json({ message: "Associated owner not found" });
          }

          const riskWithDetails = {
            ...risk.toObject(),
            issue_details: issue,
            owner_details: owner
          };

          res.status(200).json(riskWithDetails);
        } catch (dbError) {
          console.error("Database operation failed:", dbError);
          res.status(500).json({ 
            message: "Failed to fetch risk details",
            error: dbError.message 
          });
        }
      } else {
        res.status(401).json({ message: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ message: "Undefined Auth Token" });
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ 
      message: "Internal server error",
      error: err.message 
    });
  }
});

router.get("/api/risk/owner/:owner", async (req, res) => {
  // filter only Risk with Owner ID
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const allTodoItems = await mitigationmodel.find({
          risk_owner: req.params.owner,
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
        const updateItem = await mitigationmodel.findByIdAndUpdate(req.params.id, {
          $set: updateData,
        });
        const allTodoItems = await mitigationmodel.find({
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
        const deleteItem = await mitigationmodel.findByIdAndDelete(req.params.id);
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
