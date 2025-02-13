// const router = require('express').Router();
// const dailyReportmodel = require('../models/dailyReportmodel');
// //import todo model 
// // const todoItemsModel = require('../models/todomodel');
// const TokenChecker = require('../TokenChecker');

// const ts = Date.now();

// //create first route --add Todo Item to database
// router.post('/api/dailyreport', async (req, res) => {
//     try {
//         const theToken = req.headers.authorization;
//         if (!!theToken) {
//             const tokenResult = TokenChecker.TokenChecker(theToken);
//             // console.log("Return Token 001 ", tokenResult);

//             if (tokenResult) {
//                 const allReportItem = await dailyReportmodel.find({ "userId": tokenResult.userId, reportDate: req.body.reportDate, archive:false })
//                 console.log("BODY ==> ", allReportItem)
//                 const newDaily = new dailyReportmodel({
//                     ...req.body,
//                     reportDate: req.body.reportDate || ts,
//                     userId: tokenResult.userId,
//                     createDate: ts,
//                     updateDate: ts,
//                     archive: false
//                 })

//                 // console.log("newDaily ->", newDaily)
//                 //save this item in database
//                 // const saveItem = await newDaily.save()
//                 if (allReportItem.length == 0) {
//                     const saveItem = await newDaily.save().catch(err => {
//                         console.error('Error while saving data:', err);
//                         throw err; // Rethrow the error to be caught by the outer catch block
//                     });

//                     res.status(200).json({ "msg": "Daily Report Saved.", "Data": saveItem });
//                 } else {
//                     res.status(420).json({ "ErrorMsg": "Data Already Exist" });
//                 }

//             }
//             else {
//                 res.status(401).json({ "ErrorMsg": "Unauthorized User" })
//             }
//         }
//         else {
//             res.status(406).json({ "ErrorMsg": "Undifined Auth Token" })
//         }


//     } catch (err) {
//         res.json(err);
//     }
// })

// // // get All Item from database
// router.get('/api/dailyreports', async (req, res) => {
//     try {
//         const { startofdate, endofdate } = req.query;
//         console.log(startofdate)
//         const currentDate = new Date(); // Current date
//         const startDate = (startofdate) ? new Date(startofdate) : new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//         const endDate = (endofdate) ? new Date(endofdate) : new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
//         const theToken = req.headers.authorization;

//         if (!!theToken) {
//             const tokenResult = TokenChecker.TokenChecker(theToken);
//             if (tokenResult) {
//                 const allReportItem = await dailyReportmodel.find({ "userId": tokenResult.userId, archive: false, reportDate: { $gte: startDate, $lte: endDate } }).sort({ reportDate: 1 });
//                 if (allReportItem.length != 0) {
//                     res.status(200).json(allReportItem);
//                 }
//                 else {
//                     res.status(404).json({ "ErrorMsg": "No Data Found" });
//                 }
//             }
//             else {
//                 res.status(401).json({ "ErrorMsg": "Unauthorized User" })
//             }
//         }
//         else {
//             res.status(406).json({ "ErrorMsg": "Undifined Auth Token" })
//         }

//     } catch (err) {
//         res.json(err);
//     }
// })

// // //Get by id route 
// router.get('/api/dailyreport/:id', async (req, res) => {
//     try {
//         const theToken = req.headers.authorization;
//         if (!!theToken) {
//             const tokenResult = TokenChecker.TokenChecker(theToken);
//             console.log("Return Token ", tokenResult);

//             if (tokenResult) {
//                 const dailyReport = await dailyReportmodel.findById(req.params.id, {});
//                 res.status(200).json(dailyReport);
//             }
//             else {
//                 res.status(401).json({ "ErrorMsg": "Unauthorized User" })
//             }
//         }
//         else {
//             res.status(406).json({ "ErrorMsg": "Undifined Auth Token" })
//         }

//     } catch (err) {
//         res.json(err);
//     }
// })



// //update item
// router.put('/api/dailyreport/:id', async (req, res) => {
//     try {

//         const theToken = req.headers.authorization;
//         if (!!theToken) {
//             const tokenResult = TokenChecker.TokenChecker(theToken);
//             console.log("Return Token ", tokenResult);

//             if (tokenResult) {

//                 //find the item by its id and update it
//                 // const updateDailyReport = await dailyReportmodel.findByIdAndUpdate(req.params.id, { $set: req.body });
//                 const updateDailyReport = await dailyReportmodel.findByIdAndUpdate(req.params.id, {
//                     ...req.body,
//                     userId: tokenResult.userId,
//                     updateDate: ts,
//                 });
//                 // res.status(200).json(updateDailyReport);
//                 const lastUpdateItem = await dailyReportmodel.find({ "userId": tokenResult.userId, reportDate: req.body.reportDate });
//                 res.status(200).json({ "msg":"Successful Updated.", updateDailyReport, lastUpdateItem });

//             }
//             else {
//                 res.status(401).json({ "ErrorMsg": "Unauthorized User" })
//             }
//         }
//         else {
//             res.status(406).json({ "ErrorMsg": "Undifined Auth Token" })
//         }
//     } catch (err) {
//         res.json(err);
//     }
// })


// // //Delete : soft delete / transfer to archive 
// router.delete('/api/dailyreport/:id', async (req, res) => {
//     try {
//         const theToken = req.headers.authorization;
//         if (!!theToken) {
//             const tokenResult = TokenChecker.TokenChecker(theToken);
//             console.log("Return Token ", tokenResult);

//             if (tokenResult) {
//                 //find the item by its id and delete it
//                  const updateDailyReport = await dailyReportmodel.findByIdAndUpdate(req.params.id, { 
//                     updateDate: ts,
//                     archive: true
//                   });

//                 res.status(200).json({ 'msg': 'Report Deleted', updateDailyReport  });

//             }
//             else {
//                 res.status(401).json({ "ErrorMsg": "Unauthorized User" })
//             }
//         }
//         else {
//             res.status(406).json({ "ErrorMsg": "Undifined Auth Token" })
//         }
//     } catch (err) {
//         res.json(err);
//     }
// })

// // //Delete item from database
// router.delete('/api/dailyreportdelete/:id', async (req, res) => {
//     try {
//         const theToken = req.headers.authorization;
//         if (!!theToken) {
//             const tokenResult = TokenChecker.TokenChecker(theToken);
//             console.log("Return Token ", tokenResult);

//             if (tokenResult) {
//                 //find the item by its id and delete it
//                 const deleteItem = await dailyReportmodel.findByIdAndDelete(req.params.id);
//                 res.status(200).json({ 'msg': 'Report Totally Deleted' });

//             }
//             else {
//                 res.status(401).json({ "ErrorMsg": "Unauthorized User" })
//             }
//         }
//         else {
//             res.status(406).json({ "ErrorMsg": "Undifined Auth Token" })
//         }
//     } catch (err) {
//         res.json(err);
//     }
// })


// //export router
// module.exports = router;