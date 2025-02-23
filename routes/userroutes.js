const router = require("express").Router();
//import todo model
const userModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const TokenChecker = require("../TokenChecker");

const ts = Date.now();

//Registration User
router.post("/api/user/registration/logger", async (req, res) => {
  try {
    const emailX = req.body.email;
    const naamX = req.body.naam;
    const Chabi = req.body.password;
    const emailExist = await userModel.findOne({ email: emailX }); // Finding the Email exist or not
    const naamExist = await userModel.findOne({ naam: naamX }); // Finding the Naam exist or not
    const StrongChabi = validator.isStrongPassword(Chabi, {
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });

    // console.log(emailX, "Email Exist: =>", emailExist);
    // console.log(naamX, "Name Exist: =>", naamExist);

    if (emailExist == null && naamExist == null) {
      if (StrongChabi == true) {
        const salt = await bcrypt.genSalt(10);
        const vungChabi = await bcrypt.hash(Chabi, salt);

        const newItem = new userModel({
          fullname: req.body.fullname,
          email: emailX,
          naam: naamX,
          chabbi: vungChabi,
          date: ts,
          role: "logger",
          acl: ["logging"],
        });
        //save this item in database
        const saveItem = await newItem.save();

        // const alluser = await userModel.find({});
        res.status(200).json({ saveItem });
        console.log("Registered User Logging  => " + req.body.fullname);
      } else {
        res
          .status(400)
          .json({
            ErrorMsg:
              "Password not strong engough. Lower Case, Upper Case, Symbol & Min 8 Char.  ",
          });
      }
    } else {
      res.status(409).json({ ErrorMsg: "Email or Username already Exist" });
      console.log("Email or Username already Exist - Logging");

    }

    // res.status(200).json(saveItem);
  } catch (err) {
    res.status(500).json({ ErrorMsg: "Server ERROR Logging " });
    console.log("Logging ERROR : " + err);
  }
});

// Daily Report Registration 
router.post("/api/user/registration/manager", async (req, res) => {
  try {
    const emailX = req.body.email;
    const naamX = req.body.naam;
    const Chabi = req.body.password;
    const emailExist = await userModel.findOne({ email: emailX }); // Finding the Email exist or not
    const naamExist = await userModel.findOne({ naam: naamX }); // Finding the Naam exist or not
    const StrongChabi = validator.isStrongPassword(Chabi, {
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });

    // console.log(emailX, "Email Exist: =>", emailExist);
    // console.log(naamX, "Name Exist: =>", naamExist);

    if (emailExist == null && naamExist == null) {
      if (StrongChabi == true) {
        const salt = await bcrypt.genSalt(10);
        const vungChabi = await bcrypt.hash(Chabi, salt);

        const newItem = new userModel({
          fullname: req.body.fullname,
          email: emailX,
          naam: naamX,
          chabbi: vungChabi,
          date: ts,
          role: "manager",
          acl: ["logging, risk, report"],
        });
        //save this item in database
        const saveItem = await newItem.save();

        // const alluser = await userModel.find({});
        res.status(200).json({ saveItem });
        console.log("Manager Registered User => " + req.body.fullname);
      } else {
        res
          .status(400)
          .json({
            ErrorMsg:
              "Password not strong engough. Lower Case, Upper Case, Symbol & Min 8 Char. ",
          });
      }
    } else {
      res.status(409).json({ ErrorMsg: "Email or Username already Exist" });
      console.log("Email or Username already Exist - Manager");

    }

    // res.status(200).json(saveItem);
  } catch (err) {
    res.status(500).json({ ErrorMsg: "Server ERROR Manager" });
    console.log("Manager ERROR : " + err);
  }
});

// CRM Registration 
router.post("/api/user/registration/owner", async (req, res) => {
  try {
    const emailX = req.body.email;
    const naamX = req.body.naam;
    const Chabi = req.body.password;
    const emailExist = await userModel.findOne({ email: emailX }); // Finding the Email exist or not
    const naamExist = await userModel.findOne({ naam: naamX }); // Finding the Naam exist or not
    const StrongChabi = validator.isStrongPassword(Chabi, {
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });

    // console.log(emailX, "Email Exist: =>", emailExist);
    // console.log(naamX, "Name Exist: =>", naamExist);

    if (emailExist == null && naamExist == null) {
      if (StrongChabi == true) {
        const salt = await bcrypt.genSalt(10);
        const vungChabi = await bcrypt.hash(Chabi, salt);

        const newItem = new userModel({
          fullname: req.body.fullname,
          email: emailX,
          naam: naamX,
          chabbi: vungChabi,
          date: ts,
          role: "owner",
          acl: ["risk, mitigation, report"],
        });
        //save this item in database
        const saveItem = await newItem.save();

        // const alluser = await userModel.find({});
        res.status(200).json({ saveItem });
        console.log("Owner Registered User => " + req.body.fullname);
      } else {
        res
          .status(400)
          .json({
            ErrorMsg:
              "Password not strong engough. Lower Case, Upper Case, Symbol & Min 8 Char. ",
          });
      }
    } else {
      res.status(409).json({ ErrorMsg: "Email or Username already Exist" });
      console.log("Email or Username already Exist - Owner");

    }

    // res.status(200).json(saveItem);
  } catch (err) {
    res.status(500).json({ ErrorMsg: "Server ERROR Owner" });
    console.log("Owner Boom" + err);
  }
});

// Inventory Registration 
router.post("/api/user/registration/management", async (req, res) => {
  try {
    const emailX = req.body.email;
    const naamX = req.body.naam;
    const Chabi = req.body.password;
    const emailExist = await userModel.findOne({ email: emailX }); // Finding the Email exist or not
    const naamExist = await userModel.findOne({ naam: naamX }); // Finding the Naam exist or not
    const StrongChabi = validator.isStrongPassword(Chabi, {
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });

    // console.log(emailX, "Email Exist: =>", emailExist);
    // console.log(naamX, "Name Exist: =>", naamExist);

    if (emailExist == null && naamExist == null) {
      if (StrongChabi == true) {
        const salt = await bcrypt.genSalt(10);
        const vungChabi = await bcrypt.hash(Chabi, salt);

        const newItem = new userModel({
          fullname: req.body.fullname,
          email: emailX,
          naam: naamX,
          chabbi: vungChabi,
          date: ts,
          role: "management",
          acl: ["report"],
        });
        //save this item in database
        const saveItem = await newItem.save();

        // const alluser = await userModel.find({});
        res.status(200).json({ saveItem });
        console.log("Management Registered User => " + req.body.fullname);
      } else {
        res
          .status(400)
          .json({
            ErrorMsg:
              "Password not strong engough. Lower Case, Upper Case, Symbol & Min 8 Char. ",
          });
      }
    } else {
      res.status(409).json({ ErrorMsg: "Email or Username already Exist" });
      console.log("Email or Username already Exist - Management");
    }

    // res.status(200).json(saveItem);
  } catch (err) {
    res.status(500).json({ ErrorMsg: "Server ERROR Management" });
    console.log("Management Boom" + err);
  }
});

// Admin Registration
router.post("/api/user/registration/superadmin", async (req, res) => {
  const emailX = req.body.email;
  const naamX = req.body.naam;
  const Chabi = req.body.password;
  const emailExist = await userModel.findOne({ email: emailX }); // Finding the Email exist or not
  const naamExist = await userModel.findOne({ naam: naamX }); // Finding the Naam exist or not
  const StrongChabi = validator.isStrongPassword(Chabi, {
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });

  // console.log(emailX, "Email Exist: =>", emailExist);
  // console.log(naamX, "Name Exist: =>", naamExist);
  try {
    if (emailExist == null && naamExist == null) {
      if (StrongChabi == true) {
        const salt = await bcrypt.genSalt(10);
        const vungChabi = await bcrypt.hash(Chabi, salt);

        const newItem = new userModel({
          fullname: req.body.fullname,
          email: emailX,
          naam: naamX,
          chabbi: vungChabi,
          date: ts,
          role: "admin",
          acl: ["risk, mitigation, report, logging"],
        });
        //save this item in database
        const saveItem = await newItem.save();

        // const alluser = await userModel.find({});
        res.status(200).json({ saveItem });
        console.log("Superadmin Registered User => " + req.body.fullname);
      } else {
        res
          .status(400)
          .json({
            ErrorMsg:
              "Password not strong engough. Lower Case, Upper Case, Symbol & Min 8 Char. ",
          });
      }
    } else {
      res.status(409).json({ ErrorMsg: "Email or Username already Exist" });
    }

    // res.status(200).json(saveItem);
  } catch (err) {
    res.status(500).json({ ErrorMsg: "Server ERROR Superadmin " });
    console.log("Superadmin Boom" + err);
  }
});

// Login Process
router.post("/api/login", async (req, res) => {
  const emailX = req.body.email;
  const Chabi = req.body.password;
  try {
    const emailExist = await userModel.findOne({ email: emailX }); // Finding the Email exist or not

    if (emailExist == null) {
      res.status(404).json({ ErrorMsg: "Email Not Found / Incorrect" });
      console.log("login Error => Email Not Found / Incorrect");
    } else {
      const validated = await bcrypt.compare(Chabi, emailExist.chabbi);
      if (validated) {
        // console.log("USER DATA:",emailExist)
        token = jwt.sign(
          {
            userId: emailExist._id,
            email: emailExist.email,
            role: emailExist.role,
            acl: emailExist.acl,
          },
          process.env.JWT_SECRET_KEY,
          { algorithm: "HS256", expiresIn: "24h" }
          // { expiresIn: "1h" }
        );
        res
          .status(200)
          .json({
            Success: [
              {
                Token: token,
                id: emailExist._id,
                name: emailExist.fullname,
                email: emailExist.email,
                username: emailExist.naam,
                role: emailExist.role,
                acl: emailExist.acl,
              },
            ],
          });
      } else {
        res.status(400).json({ ErrorMsg: "Wrong Password" });
        console.log("login Error => Wrong Password");
      }
    }
  } catch (error) {
    res.status(500).json({ ErrorMsg: "Server Error" });
    console.log("login Error => " + error);
  }
});

// get an User data
router.get("/api/user/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
    //   console.log("Return Token ", tokenResult);

      if (tokenResult.userId === req.params.id || tokenResult.role === 'admin' || tokenResult.role === 'management' || tokenResult.role === 'manager') {
        // console.log("Lol Token ", tokenResult);
        const theUser = await userModel.findById(req.params.id);
        res.status(200).json(theUser);
      } else {
        res.status(401).json({ ErrorMsg: "Unauthorized User" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undifined Auth Token" });
    }
  } catch (err) {
    res.json({ Error: err, ErrorMsg: "Server Error" });
  }
});

// Update User Data
router.put("/api/user/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
    //   console.log("Return Token ", tokenResult);

      if (tokenResult) {
        //find the item by its id and update it
        const updateItem = await userModel.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        // res.status(200).json(updateItem);
        const allTodoItems = await userModel.find({
          userId: tokenResult.userId,
        });
        res.status(200).json({ updateItem, allTodoItems });
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

// get All Users Data
router.get("/api/users", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    // console.log("Check Token User => ", theToken);
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      //   console.log(tokenResult);
      // const alluser = [];
      if (tokenResult.role === 'admin' || tokenResult.role === 'management' || tokenResult.role === 'manager') {
        // res.status(200).json({ success: true, data: { userId: decodedToken.userId, email: decodedToken.email } })
        const alluser = await userModel.find({});
        res.status(200).json(alluser);
      } else {
        res.status(401).json({ ErrorMsg: "User Not an Admin" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undifined Auth Token" });
    }
  } catch (err) {
    res.status(500).json({ Error: err, ErrorMsg: "Server Error" });
  }
});

// get All Owner type users Data
router.get("/api/owner", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    // console.log("Check Token User => ", theToken);
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken);
      //   console.log(tokenResult);
      // const alluser = [];
      // if (tokenResult.role === "admin") {
        // res.status(200).json({ success: true, data: { userId: decodedToken.userId, email: decodedToken.email } })
        const alluser = await userModel.find({role:'owner'});
        res.status(200).json(alluser);
      // } else {
      //   res.status(401).json({ ErrorMsg: "User Not an Admin" });
      // }
    } else {
      res.status(406).json({ ErrorMsg: "Undifined Auth Token" });
    }
  } catch (err) {
    res.status(500).json({ Error: err, ErrorMsg: "Server Error" });
  }
});

//Delete item from database
router.delete("/api/user/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization;
    if (!!theToken) {
        const tokenResult = TokenChecker.TokenChecker(theToken);
        console.log("USER DELTED BY => ", tokenResult.role, tokenResult.userId, " || DELETE ID =>", req.params.id);
      // const alluser = [];
      if (tokenResult.role === "admin") {
        //find the item by its id and delete it
        const deleteUser = await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "User Deleted" });
      } else {
        res.status(401).json({ ErrorMsg: "User Not an Admin" });
      }
    } else {
      res.status(406).json({ ErrorMsg: "Undifined Auth Token" });
    }
  } catch (err) {
    res.status(500).json({ Error: err, ErrorMsg: "Server Error" });
  }
});

//export router
module.exports = router;
