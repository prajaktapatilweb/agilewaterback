const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const Comments = require("../../models/Comments");
require("dotenv").config();

async function getCommentsList(req, res, PageAsPath,pageLink) {
  console.log("In get Comments List", PageAsPath);
  let NewList;
  const token = req?.headers?.authorization;
  if (!PageAsPath || pageLink === 'adminpages') {
    NewList = await Comments.find({ Comments: { $elemMatch: { Status: "SentForModeration" } } });
  } else {
    NewList = await Comments.findOne({ PageAsPath: PageAsPath }, { _id: 0 });
  }
  console.log("first", NewList);
  return res.status(200).json({ List: NewList });
}

router.get("/getpagecommentlist/", async (req, res) => {
  const PageAsPath = req.query.PageAsPath;
  console.log("In request Get Page Wise comments List ", req.query.PageAsPath);
  try {
    getCommentsList(req, res, PageAsPath);
  } catch (err) {
    console.log("Error ", err);
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
});

// router.get("/getallcommentlist/", auth, async (req, res) => {
//   try {
//     console.log("In get All Comments List");
//     let NewList = await Comments.find({ Comments: { $elemMatch: { Status: "SentForModeration" } } });
//     console.log("All Comment", NewList);
//     return res.status(200).json({ List: NewList });
//   } catch (err) {
//     console.log("Error ", err);
//     return res.status(500).json({ error: `Server Error: ${err}` });
//   }
// });

router.post("/addnewcomment", async (req, res) => {
  console.log("In post new comment");
  try {
    const data = req.body;
    const pageLink = req.body.pageLink;
    console.log("Comments ", data);
    data.Comment.OnDate = Date.now();
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
        getCommentsList(req, res, req.body.PageAsPath,pageLink);
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

router.put("/FBChangeStatus/:CommentID", async (req, res) => {
  console.log("In Delete Course", req.params, req.body);
  try {
    const PageAsPath = req.body.PageAsPath;
    const pageLink = req.body.pageLink;
    const CommentID = req.params.CommentID;
    await Comments.updateOne(
      { PageAsPath: PageAsPath, "Comments._id": CommentID },
      {
        $set: {
          "Comments.$.Status": "Deleted",
        },
      }
    );
    getCommentsList(req, res, PageAsPath,pageLink);
  } catch (err) {
    console.log("errr", err);
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
});

router.put("/JWTChangeStatus/:CommentID", auth, async (req, res) => {
  console.log("In JWT Change Status Course", req.params, req.body);
  try {
    const PageAsPath = req.body.PageAsPath;
    const CommentID = req.params.CommentID;
    const pageLink = req.body.pageLink;
    await Comments.updateOne(
      { PageAsPath: PageAsPath, "Comments._id": CommentID },
      {
        $set: {
          "Comments.$.Status": req.body.Status,
          "Comments.$.Approval.By": req.user.gid,
          "Comments.$.Approval.OnDate": Date.now(),
        },
      }
    );
    getCommentsList(req, res, PageAsPath,pageLink);
  } catch (err) {
    console.log("errr", err);
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
});

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
