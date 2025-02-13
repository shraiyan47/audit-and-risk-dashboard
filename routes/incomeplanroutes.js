const router = require("express").Router();
//import todo model
const IncomePlanModel = require("../models/incomeplanmodel");
const TokenChecker = require("../TokenChecker");

const ts = Date.now();

//create first route --add Income Plan to database
router.post("/api/IncomePlan", async (req, res) => {
  console.log(req.body);
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const newIncomePlan = new IncomePlanModel({
          monthly_sheet_id: req.body.monthly_sheet_id,
          plan_id: req.body.plan_id,
          plan_amount: req.body.plan_amount,
          isActive: true,
          date: ts,
          userId: tokenResult.userId,
        });
        //save this Plan in database
        const saveIncomePlan = await newIncomePlan.save();
        console.log("Done 1");
        const allIncomePlan = await IncomePlanModel.find({
          userId: tokenResult.userId,
        });
        console.log("Done 2");

        res.status(200).json({ saveIncomePlan, allIncomePlan });
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

// // get All IncomePlan from database
router.get("/api/IncomePlan", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const allIncomePlan = await IncomePlanModel.find({
          userId: tokenResult.userId,
        });
        const activePlans = allIncomePlan.filter(plan => plan.isActive==true);
        const inactivePlans = allIncomePlan.filter(plan => plan.isActive==false);

        res.status(200).json({activePlans, inactivePlans});
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
router.get("/api/IncomePlan/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const AIncomePlan = await IncomePlanModel.findById(req.params.id, {});
        res.status(200).json(AIncomePlan);
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

//update IncomePlan
router.put("/api/IncomePlan/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        console.log("Income Plan update ID: ", req.params.id);
        //find the IncomePlan by its id and update it
        const updateIncomePlan = await IncomePlanModel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body }
        );
        // res.status(200).json(updateIncomePlan);
        const allIncomePlan = await IncomePlanModel.find({
          userId: tokenResult.userId,
        });
        res.status(200).json({ updateIncomePlan, allIncomePlan });
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

//Soft Delete IncomePlan
router.delete("/api/IncomePlan/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the IncomePlan by its id and delete it
        // const deleteIncomePlan = await IncomePlanModel.findByIdAndDelete(
        //   req.params.id
        // );
        const updateDailyReport = await IncomePlanModel.findByIdAndUpdate(
          req.params.id,
          {
            isActive: false,
          }
        );
        res
          .status(200)
          .json({ msg: req.params.id + " - Income Plan Deleted" });
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

//Delete IncomePlan from database
router.delete("/api/IncomePlanDelete/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the IncomePlan by its id and delete it
        const deleteIncomePlan = await IncomePlanModel.findByIdAndDelete(
          req.params.id
        );

        res.status(200).json({
          msg: req.params.id + " - Income Plan Permanently Deleted",
        });
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
