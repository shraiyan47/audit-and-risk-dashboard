const router = require("express").Router();
const multer = require("multer");
const issuesModel = require("../models/issuemodel");
const TokenChecker = require("../TokenChecker");

const ts = Date.now();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//create first route --add Todo Item to database
router.post("/api/issue", upload.single('issue_attachments'), async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        console.log(req.body); //req.body is the data that we are sending to the server
        const newItem = new issuesModel({
          issue_title: req.body.issue_title,
          issue_description: req.body.issue_description,
          issue_source: req.body.issue_source,
          issue_category: req.body.issue_category,
          issue_priority: req.body.issue_priority,
          issue_status: req.body.issue_status,
          issue_attachments: req.file
            ? {
                data: req.file.buffer,
                contentType: req.file.mimetype,
              }
            : undefined,
          date: ts,
          complete: false,
          userId: tokenResult.userId,
        });
        //save this item in database
        const saveItem = await newItem.save();
        console.log(saveItem);

        res.status(200).json(saveItem);
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
router.get("/api/issue", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const allTodoItems = await issuesModel.find({});
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

router.get("/api/issue/status/:status", async (req, res) => { // filter only issues with status
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const allTodoItems = await issuesModel.find({
          issue_status: req.params.status,
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
router.get("/api/issue/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const theTodo = await issuesModel.findById(req.params.id, {});
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
router.put("/api/issue/:id", upload.single('issue_attachments'), async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the item by its id and update it
        const updateData = {
          ...req.body,
          issue_attachments: req.file
            ? {
                data: req.file.buffer,
                contentType: req.file.mimetype,
              }
            : undefined,
        };
        const updateItem = await issuesModel.findByIdAndUpdate(req.params.id, {
          $set: updateData,
        });
        const allTodoItems = await issuesModel.find({
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
router.delete("/api/issue/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the item by its id and delete it
        const deleteItem = await issuesModel.findByIdAndDelete(req.params.id);
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
