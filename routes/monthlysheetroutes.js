const router = require("express").Router();
//import todo model
const MonthlySheetModel = require("../models/MonthlySheetmodel");
const TokenChecker = require("../TokenChecker");

const ts = Date.now();

//create first route --add Monthly Sheet to database
router.post("/api/MonthlySheet", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const newMonthlySheet = new MonthlySheetModel({
          month_name: req.body.month_name,
          starting_balance: req.body.starting_balance,
          isActive: true,
          date: ts,
          userId: tokenResult.userId,
        });
        //save this MonthlySheet in database
        const saveMonthlySheet = await newMonthlySheet.save();
        console.log("Done 1");
        const allMonthlySheet = await MonthlySheetModel.find({
          userId: tokenResult.userId,
        });
        console.log("Done 2");

        res.status(200).json({ saveMonthlySheet, allMonthlySheet });
        // res.status(200).json(saveMonthlySheet);
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

// // get All MonthlySheet from database
router.get("/api/MonthlySheet", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const allMonthlySheet = await MonthlySheetModel.find({
          userId: tokenResult.userId,
        });
        res.status(200).json(allMonthlySheet);
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
router.get("/api/MonthlySheet/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const AMonthlySheet = await MonthlySheetModel.findById(
          req.params.id,
          {}
        );
        res.status(200).json(AMonthlySheet);
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

//update MonthlySheet
router.put("/api/MonthlySheet/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        console.log("Monthly Sheet update ID: ", req.params.id);
        //find the MonthlySheet by its id and update it
        const updateMonthlySheet = await MonthlySheetModel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body }
        );
        // res.status(200).json(updateMonthlySheet);
        const allMonthlySheet = await MonthlySheetModel.find({
          userId: tokenResult.userId,
        });
        res.status(200).json({ updateMonthlySheet, allMonthlySheet });
        
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

//Soft Delete MonthlySheet 
router.delete("/api/MonthlySheet/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the MonthlySheet by its id and delete it
        // const deleteMonthlySheet = await MonthlySheetModel.findByIdAndDelete(
        //   req.params.id
        // );
        const updateDailyReport = await MonthlySheetModel.findByIdAndUpdate(
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

//Delete MonthlySheet from database
router.delete("/api/MonthlySheetDelete/:id", async (req, res) => {
    try {
      const theToken = req.headers.authorization;
      if (!!theToken) {
        const tokenResult = TokenChecker.TokenChecker(theToken);
        console.log("Return Token ", tokenResult);
  
        if (tokenResult) {
          //find the MonthlySheet by its id and delete it
          const deleteMonthlySheet = await MonthlySheetModel.findByIdAndDelete(
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
