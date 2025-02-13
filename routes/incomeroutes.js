const router = require("express").Router();
//import todo model
const IncomeModel = require("../models/incomemodel");
const TokenChecker = require("../TokenChecker");

const ts = Date.now();

//create first route --add Income Plan to database
router.post("/api/Income", async (req, res) => {
  console.log(req.body);
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const newIncome = new IncomeModel({
          monthly_sheet_id: req.body.monthly_sheet_id,
          incomePlan_id: req.body.incomePlan_id,
          amount: req.body.amount,
          description: req.body.description,
          income_date: (req.body.income_date)?req.body.income_date:ts,
          isActive: true,
          date: ts,
          userId: tokenResult.userId,
        });
        //save this Plan in database
        const saveIncome = await newIncome.save();
        console.log("Done 1");
        const allIncome = await IncomeModel.find({
          userId: tokenResult.userId,
        });
        console.log("Done 2");

        res.status(200).json({ saveIncome, allIncome });
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

// // get All Income from database
router.get("/api/Income", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const allIncome = await IncomeModel.find({
          userId: tokenResult.userId,
        });
        const IncomeData = allIncome.filter(plan => plan.isActive==true);
        // const inactivePlans = allIncome.filter(plan => plan.isActive==false);

        res.status(200).json({IncomeData});
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
router.get("/api/Income/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const AIncome = await IncomeModel.findById(req.params.id, {});
        res.status(200).json(AIncome);
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

//update Income
router.put("/api/Income/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        console.log("Income Plan update ID: ", req.params.id);
        //find the Income by its id and update it
        const updateIncome = await IncomeModel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body }
        );
        // res.status(200).json(updateIncome);
        const allIncome = await IncomeModel.find({
          userId: tokenResult.userId,
        });
        res.status(200).json({ updateIncome, allIncome });
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

//Soft Delete Income
router.delete("/api/Income/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the Income by its id and delete it
        // const deleteIncome = await IncomeModel.findByIdAndDelete(
        //   req.params.id
        // );
        const updateDailyReport = await IncomeModel.findByIdAndUpdate(
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

//Delete Income from database
router.delete("/api/IncomeDelete/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the Income by its id and delete it
        const deleteIncome = await IncomeModel.findByIdAndDelete(
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
