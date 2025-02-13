const router = require("express").Router();
//import todo model
const ExpensesPlanModel = require("../models/expensesplanmodel");
const TokenChecker = require("../TokenChecker");

const ts = Date.now();

//create first route --add Expense Plan to database
router.post("/api/ExpensesPlan", async (req, res) => {
  console.log(req.body);
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const newExpensesPlan = new ExpensesPlanModel({
          monthly_sheet_id: req.body.monthly_sheet_id,
          plan_id: req.body.plan_id,
          plan_amount: req.body.plan_amount,
          isActive: true,
          date: ts,
          userId: tokenResult.userId,
        });
        //save this Plan in database
        const saveExpensesPlan = await newExpensesPlan.save();
        console.log("Done 1");
        const allExpensesPlan = await ExpensesPlanModel.find({
          userId: tokenResult.userId,
        });
        console.log("Done 2");

        res.status(200).json({ saveExpensesPlan, allExpensesPlan });
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

// // get All ExpensesPlan from database
router.get("/api/ExpensesPlan", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const allExpensesPlan = await ExpensesPlanModel.find({
          userId: tokenResult.userId,
        });
        const activePlans = allExpensesPlan.filter(plan => plan.isActive==true);
        const inactivePlans = allExpensesPlan.filter(plan => plan.isActive==false);

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
router.get("/api/ExpensesPlan/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const AExpensesPlan = await ExpensesPlanModel.findById(req.params.id, {});
        res.status(200).json(AExpensesPlan);
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

//update ExpensesPlan
router.put("/api/ExpensesPlan/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        console.log("Expense Plan update ID: ", req.params.id);
        //find the ExpensesPlan by its id and update it
        const updateExpensesPlan = await ExpensesPlanModel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body }
        );
        // res.status(200).json(updateExpensesPlan);
        const allExpensesPlan = await ExpensesPlanModel.find({
          userId: tokenResult.userId,
        });
        res.status(200).json({ updateExpensesPlan, allExpensesPlan });
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

//Soft Delete ExpensesPlan
router.delete("/api/ExpensesPlan/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the ExpensesPlan by its id and delete it
        // const deleteExpensesPlan = await ExpensesPlanModel.findByIdAndDelete(
        //   req.params.id
        // );
        const updateDailyReport = await ExpensesPlanModel.findByIdAndUpdate(
          req.params.id,
          {
            isActive: false,
          }
        );
        res
          .status(200)
          .json({ msg: req.params.id + " - Expense Plan Deleted" });
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

//Delete ExpensesPlan from database
router.delete("/api/ExpensesPlanDelete/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the ExpensesPlan by its id and delete it
        const deleteExpensesPlan = await ExpensesPlanModel.findByIdAndDelete(
          req.params.id
        );

        res.status(200).json({
          msg: req.params.id + " - Expense Plan Permanently Deleted",
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
