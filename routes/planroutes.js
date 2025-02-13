const router = require("express").Router();
//import todo model
const PlanModel = require("../models/planmodel");
const TokenChecker = require("../TokenChecker");

const ts = Date.now();

//create first route --add Monthly Sheet to database
router.post("/api/Plan", async (req, res) => {
  console.log(req.body)
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const newPlan = new PlanModel({
          plan_name: req.body.plan_name,
          isActive: true,
          date: ts,
          userId: tokenResult.userId,
        });
        //save this Plan in database
        const savePlan = await newPlan.save();
        console.log("Done 1");
        const allPlan = await PlanModel.find({
          userId: tokenResult.userId,
        });
        console.log("Done 2");

        res.status(200).json({ savePlan, allPlan });
        // res.status(200).json(savePlan);
      } else {
        res.status(401).json({ ErrorMsg: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undifined Auth Token" });
    }
  } catch (err) {
    res.json(err);
  }
});

// // get All Plan from database
router.get("/api/Plan", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const allPlan = await PlanModel.find({
          userId: tokenResult.userId,
        });
        res.status(200).json(allPlan);
      } else {
        res.status(401).json({ ErrorMsg: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undifined Auth Token" });
    }
  } catch (err) {
    res.json(err);
  }
});

//Get by id route
router.get("/api/Plan/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const APlan = await PlanModel.findById(
          req.params.id,
          {}
        );
        res.status(200).json(APlan);
      } else {
        res.status(401).json({ ErrorMsg: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undifined Auth Token" });
    }
  } catch (err) {
    res.json(err);
  }
});

//update Plan
router.put("/api/Plan/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        console.log("Monthly Sheet update ID: ", req.params.id);
        //find the Plan by its id and update it
        const updatePlan = await PlanModel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body }
        );
        // res.status(200).json(updatePlan);
        const allPlan = await PlanModel.find({
          userId: tokenResult.userId,
        });
        res.status(200).json({ updatePlan, allPlan });
        
      } else {
        res.status(401).json({ ErrorMsg: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undifined Auth Token" });
    }
  } catch (err) {
    res.json(err);
  }
});

//Soft Delete Plan 
router.delete("/api/Plan/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the Plan by its id and delete it
        // const deletePlan = await PlanModel.findByIdAndDelete(
        //   req.params.id
        // );
        const updateDailyReport = await PlanModel.findByIdAndUpdate(
            req.params.id,
            {
              isActive: false,
            }
          );
        res.status(200).json({ msg: req.params.id+" - Monthly Sheet Deleted" });
      } else {
        res.status(401).json({ ErrorMsg: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undifined Auth Token" });
    }
  } catch (err) {
    res.json(err);
  }
});

//Delete Plan from database
router.delete("/api/PlanDelete/:id", async (req, res) => {
    try {
      const theToken = req.headers.authorization;
      if (!!theToken) {
        const tokenResult = TokenChecker.TokenChecker(theToken);
        console.log("Return Token ", tokenResult);
  
        if (tokenResult) {
          //find the Plan by its id and delete it
          const deletePlan = await PlanModel.findByIdAndDelete(
            req.params.id
          );
          
          res.status(200).json({ msg: req.params.id+" - Monthly Sheet Permanently Deleted" });
        } else {
          res.status(401).json({ ErrorMsg: "Unauthorized User" });
        }
      } else {
        res.status(406).json({ ErrorMsg: "Undifined Auth Token" });
      }
    } catch (err) {
      res.json(err);
    }
  });

//export router
module.exports = router;
