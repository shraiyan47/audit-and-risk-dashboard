const router = require("express").Router();
//import todo model
const ExpenseModel = require("../models/expensemodel");
const TokenChecker = require("../TokenChecker");

const ts = Date.now();

//create first route --add Expense Plan to database
router.post("/api/Expense", async (req, res) => {
  console.log(req.body);
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const newExpense = new ExpenseModel({
          monthly_sheet_id: req.body.monthly_sheet_id,
          expensePlan_id: req.body.ExpensePlan_id,
          amount: req.body.amount,
          description: req.body.description,
          expense_date: (req.body.Expense_date)?req.body.Expense_date:ts,
          isActive: true,
          date: ts,
          userId: tokenResult.userId,
        });
        //save this Plan in database
        const saveExpense = await newExpense.save();
        console.log("Done 1");
        const allExpense = await ExpenseModel.find({
          userId: tokenResult.userId,
        });
        console.log("Done 2");

        res.status(200).json({ saveExpense, allExpense });
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

// // get All Expense from database
router.get("/api/Expense", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const allExpense = await ExpenseModel.find({
          userId: tokenResult.userId,
        });
        const ExpenseData = allExpense.filter(plan => plan.isActive==true);
        // const inactivePlans = allExpense.filter(plan => plan.isActive==false);

        res.status(200).json({ExpenseData});
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
router.get("/api/Expense/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const AExpense = await ExpenseModel.findById(req.params.id, {});
        res.status(200).json(AExpense);
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

//update Expense
router.put("/api/Expense/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        console.log("Expense Plan update ID: ", req.params.id);
        //find the Expense by its id and update it
        const updateExpense = await ExpenseModel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body }
        );
        // res.status(200).json(updateExpense);
        const allExpense = await ExpenseModel.find({
          userId: tokenResult.userId,
        });
        res.status(200).json({ updateExpense, allExpense });
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

//Soft Delete Expense
router.delete("/api/Expense/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the Expense by its id and delete it
        // const deleteExpense = await ExpenseModel.findByIdAndDelete(
        //   req.params.id
        // );
        const updateDailyReport = await ExpenseModel.findByIdAndUpdate(
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

//Delete Expense from database
router.delete("/api/ExpenseDelete/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the Expense by its id and delete it
        const deleteExpense = await ExpenseModel.findByIdAndDelete(
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
