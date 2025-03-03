const router = require("express").Router();
const multer = require("multer");
const mitigationModel = require("../models/mitigationmodel");
const TokenChecker = require("../TokenChecker");
const risksModel = require("../models/riskmodel");
const usermodel = require("../models/usermodel");

const ts = Date.now(); // Get the current timestamp

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a mitigation
router.post("/api/mitigation", async (req, res) => {
  try {
    const theToken = req.headers.authorization; // Get the authorization token from headers
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken); // Check the token validity
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        console.log(req.body); // Log the request body

        const isRiskExist = await risksModel.findById(req.body.risk_id); // Check if the risk exists
        const isOwnerExist = await usermodel.findById(req.body.userId); // Check if the owner exists
        if (!isRiskExist) {
          return res.status(404).json({ ErrorMsg: "Risk not found" });
        } else {
          if (!isOwnerExist) {
            return res.status(404).json({ ErrorMsg: "Owner not found" });
          } else {
            const newItem = new mitigationModel({
              risk_id: req.body.risk_id, // Risk ID
              actions: req.body.actions, // Actions to mitigate the risk
              timeline: req.body.timeline, // Timeline for the actions
              resources: req.body.resources, // Resources required
              status: req.body.status, // Status of the mitigation
              date: ts, // Current timestamp
              complete: false, // Completion status
              userId: tokenResult.userId, // User ID from the token
            });
            // Save this item in the database
            const saveItem = await newItem.save();
            console.log(saveItem);

            res.status(200).json(saveItem);
          }
        }
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

// Get all mitigations
router.get("/api/mitigation", async (req, res) => {
  try {
    const theToken = req.headers.authorization; // Get the authorization token from headers
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken); // Check the token validity
      if (tokenResult) {
        try {
          let allMitigations = await mitigationModel.find({}); // Fetch all mitigations
          if (!allMitigations) {
            return res.status(404).json({ message: "No mitigations found" });
          }

          const mitigationsWithDetails = await Promise.all(
            allMitigations.map(async (mitigation) => {
              try {
                const [risk, owner] = await Promise.all([
                  risksModel.findById(mitigation.risk_id).select('risk_code').lean(), // Fetch risk details
                  usermodel.findById(mitigation.userId).select('fullname email').lean() // Fetch owner details
                ]);

                if (!risk) throw new Error(`Risk not found for mitigation ${mitigation._id}`);
                if (!owner) throw new Error(`Owner not found for mitigation ${mitigation._id}`);

                return {
                  ...mitigation.toObject(),
                  risk_details: risk,
                  owner_details: owner
                };
              } catch (innerError) {
                console.error(`Error processing mitigation ${mitigation._id}:`, innerError);
                return {
                  ...mitigation.toObject(),
                  risk_details: null,
                  owner_details: null,
                  error: innerError.message
                };
              }
            })
          );

          res.status(200).json(mitigationsWithDetails);
        } catch (dbError) {
          console.error("Database operation failed:", dbError);
          res.status(500).json({ 
            message: "Failed to fetch mitigations data",
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

// Get mitigation by ID
router.get("/api/mitigation/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization; // Get the authorization token from headers
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken); // Check the token validity
      if (tokenResult) {
        try {
          const mitigation = await mitigationModel.findById(req.params.id); // Fetch mitigation by ID
          if (!mitigation) {
            return res.status(404).json({ message: "Mitigation not found" });
          }

          const [risk, owner] = await Promise.all([
            risksModel.findById(mitigation.risk_id).select('risk_code').lean(), // Fetch risk details
            usermodel.findById(mitigation.userId).select('fullname email').lean() // Fetch owner details
          ]);

          if (!risk) {
            return res.status(404).json({ message: "Associated risk not found" });
          }
          if (!owner) {
            return res.status(404).json({ message: "Associated owner not found" });
          }

          const mitigationWithDetails = {
            ...mitigation.toObject(),
            risk_details: risk,
            owner_details: owner
          };

          res.status(200).json(mitigationWithDetails);
        } catch (dbError) {
          console.error("Database operation failed:", dbError);
          res.status(500).json({ 
            message: "Failed to fetch mitigation details",
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

// Get mitigations by owner ID
router.get("/api/mitigation/owner/:owner", async (req, res) => {
  try {
    const theToken = req.headers.authorization; // Get the authorization token from headers
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken); // Check the token validity
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        const allMitigations = await mitigationModel.find({
          userId: req.params.owner, // Fetch mitigations by owner ID
        });
        res.status(200).json(allMitigations);
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

// Update mitigation
router.put("/api/mitigation/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization; // Get the authorization token from headers
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken); // Check the token validity
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        // Find the item by its id and update it
        const updateData = {
          ...req.body,
        };
        const updateItem = await mitigationModel.findByIdAndUpdate(req.params.id, {
          $set: updateData,
        });
        const allMitigations = await mitigationModel.find({
          userId: tokenResult.userId,
        });
        res.status(200).json({ updateItem, allMitigations });
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

// Delete mitigation
router.delete("/api/mitigation/:id", async (req, res) => {
  try {
    const theToken = req.headers.authorization; // Get the authorization token from headers
    if (!!theToken) {
      const tokenResult = TokenChecker.TokenChecker(theToken); // Check the token validity
      console.log("Return Token ", tokenResult);

      if (tokenResult) {
        // Find the item by its id and delete it
        const deleteItem = await mitigationModel.findByIdAndDelete(req.params.id);
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

// Export router
module.exports = router;
