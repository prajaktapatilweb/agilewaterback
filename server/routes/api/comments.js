const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const Comments = require("../../models/Comments");
require("dotenv").config();

async function getCommentsList(req, res,PageAsPath) {
  console.log("In get Comments List");
  let NewList = await Comments.findOne({ PageAsPath}, { _id: 0 });
  console.log("first", NewList);
  return res.status(200).json({ List: NewList });
}

router.get("/getpagecommentlist/", async (req, res) => {
    const PageAsPath = req.query.PageAsPath;
    console.log("In request Get Page Wise comments List ",req.query.PageAsPath);
  try {
    getCommentsList(req, res,PageAsPath);
  } catch (err) {
    console.log("Error ", err);
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
});

router.post("/addnewcomment", async (req, res) => {
  console.log("In post new comment");
  try {
    const data = req.body;
    console.log("Comments ", data);
    data.Comment.OnDate = Date.now()
    // return res.status(200).json({ data: "Success" });
    await Comments.updateOne(
      { PageAsPath: data.PageAsPath },
      {
        $setOnInsert: {
          PageAsPath: data.PageAsPath,
        },
        $push: { Comments: data.Comment },
      },
      { upsert: true }
    )
      .then(() => {
        getCommentsList(req, res, req.body.PageAsPath);
      })
      .catch((err) => {
        console.log("Errot", err);
        return res.status(500).json({ error: `Problem in Storing to MongoDB: ${err}` });
      });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
});

// router.delete("/deletcomment/:UserID", auth, async (req, res) => {
//   console.log("In Delete Course", req.params, req.query);
//   try {
//     const deleteUser = req.params.UserID;
//     await User.updateOne(
//       { UserID: deleteUser },
//       {
//         $set: {
//           Status: "Deleted",
//           "Deletion.ByID": req.user.gid,
//           "Deletion.ByName": req.user.gid,
//           "Deletion.OnDate": new Date(),
//           "Deletion.DeleteReason": req.user.gid,
//         },
//       }
//     );

//     getUsersList(req, res);
//   } catch (err) {
//     console.log("errr", err);
//     return res.status(500).json({ error: `Server Error: ${err}` });
//   }
// });

// router.put("/updateuser/:UserID", auth, async (req, res) => {
//   try {
//     uploadController.multipleUpload(req, res, function (err) {
//       if (err) {
//         console.log("Error Photo Submission", err);
//         return res.end("Error uploading file.");
//       }
//       console.log("In request Update Indiv User Data ", req.params, req.body);
//       async function asyncPutCall() {
//         const UserID = req.params.UserID;
//         const newData = req.body;
//         let oldData = await User.findOne({ UserID });
//         console.log("DDDEEE", oldData, newData);
//         let updatedThings = [];
//         let cnt = 0;

//         for (const property in newData) {
//           if (property !== "photoURL")
//             if (`${newData[property]}` !== `${oldData[property]}`) {
//               console.log("DDD", property);
//               updatedThings.push({
//                 keyname: property,
//                 oldValue: oldData[property],
//                 newValue: newData[property],
//               });
//               cnt++;
//             }
//           // updatedString += `${property} : ${oldData[property]} --> ${newData[property]} \n`;
//         }
//         console.log("first", cnt, updatedThings);

//         if (cnt > 0) {
//           console.log("To update");
//           await User.updateOne(
//             { UserID: UserID },
//             {
//               $set: newData,
//               $push: {
//                 Updation: [
//                   {
//                     ByID: req.user.gid,
//                     ByName: req.user.name,
//                     OnDate: new Date(),
//                     Updates: updatedThings,
//                   },
//                 ],
//               },
//             }
//           )
//             .then(async () => {
//               let enterData = await User.findOne({ UserID });
//               console.log("The renter data", enterData);
//               getUsersList(req, res);
//             })
//             .catch((err) => {
//               console.log("errr", err);

//               return res.status(500).json({ error: "Server Error" });
//             });
//         } else {
//           return res.json("Nothing to update");
//         }
//       }
//       asyncPutCall();
//     });
//   } catch (err) {
//     console.log("errr", err);
//     // logger.error(`Catch Block - User List Request Block ${err}`, { by: req.user.gid, for: [0], info: {} })
//     return res.status(500).json({ error: `Server Error: ${err}` });
//   }
// });

module.exports = router;
