const express = require("express");
const { indexof } = require("stylis");
const auth = require("../../middleware/auth");
const CoursesList = require("../../models/CoursesList");
const router = express.Router();
const moment = require("moment");
const CoachesList = require("../../models/CoachesList");
const uploadController = require("../../middleware/uploadMultipleFiles");

async function getCoachList(req, res) {
  console.log("In get Coach List");
  let NewList = await CoachesList.find({ Status: "Active" });
  console.log("first", NewList.length);
  return res.status(200).json({ List: NewList });
}
router.get("/getcoachlist", auth, async (req, res) => {
  console.log("In request Get Coach List ");
  try {
    // updateStatus();
    getCoachList(req, res);
    // let NewList = await CoachesList.find({ Status: "Active" });
    // console.log("first", NewList.length);
    // return res.status(200).json({ List: NewList });
  } catch (err) {
    // logger.error(`Catch Block - User List Request Block ${err}`, { by: req.user.gid, for: [0], info: {} })
    console.log("Error ", err);
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
});

// router.get("/getindividualcourse", async (req, res) => {
//   console.log("In request Get Indiv Course Data ", req.query);
//   // res.setHeader("Access-Control-Allow-Origin", "*");

//   try {
//     let CourseData = await CoursesList.findOne(
//       { CourseID: req.query.CourseID },
//       {
//         CourseID: 1,
//         CourseName: 1,
//         EndDate: 1,
//         EventDeleteDate: 1,
//         Place: 1,
//         ActualCost: 1,
//         DiscountedCost: 1,
//         StartDate: 1,
//         Time: 1,
//         Trainer: 1,
//         _id: 0,
//       }
//     );

//     console.log("first", CourseData);

//     return res.status(200).json({ CourseData });
//   } catch (err) {
//     // logger.error(`Catch Block - User List Request Block ${err}`, { by: req.user.gid, for: [0], info: {} })
//     return res.status(500).json({ error: `Server Error: ${err}` });
//   }
// });

router.post("/addnewcoach", auth, async (req, res) => {
  console.log("In add new Course router post request");
  try {
    uploadController.multipleUpload(req, res, function (err) {
      if (err) {
        console.log("Error Photo Submission", err);
        return res.end("Error uploading file.");
      }
      // const CoachID = req.params.ID;
      const data = req.body;
      async function asyncCall() {
        let totalNumber = await CoachesList.countDocuments();
        totalNumber = totalNumber >= 1 ? totalNumber + 1 : 1;
        data.CoachID = `ID-${totalNumber}`;
        // data.Avatar = req.Avatar;

        data.Created = {};
        data.Created.ByID = req.user.gid;
        data.Created.ByName = req.user.name;

        FinalData = new CoachesList(data);
        console.log("Final Data", FinalData);
        await FinalData.save()
          .then(() => {
            return res.status(200).json({ data: "Success" });
          })
          .catch((err) => {
            console.log("Errot", err);
            return res.status(500).json({ error: `Problem in Storing to MongoDB: ${err}` });
          });
      }
      asyncCall();
    });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
});

router.put("/updatecoach/:CoachID", auth, async (req, res) => {
  try {
    uploadController.multipleUpload(req, res, function (err) {
      if (err) {
        console.log("Error Photo Submission", err);
        return res.end("Error uploading file.");
      }
      console.log("In request Update Indiv User Data ", req.params, req.body);
      async function asyncPutCall() {
        const CoachID = req.params.CoachID;
        const newData = req.body;
        let oldData = await CoachesList.findOne({ CoachID });
        console.log("DDDEEE", oldData, newData);
        let updatedThings = [];
        let cnt = 0;

        for (const property in newData) {
          if (property !== "photoURL")
            if (`${newData[property]}` !== `${oldData[property]}`) {
              console.log("DDD", property);
              updatedThings.push({
                keyname: property,
                oldValue: oldData[property],
                newValue: newData[property],
              });
              cnt++;
            }
          // updatedString += `${property} : ${oldData[property]} --> ${newData[property]} \n`;
        }
        console.log("first", cnt, updatedThings);

        if (cnt > 0) {
          console.log("To update");
          await CoachesList.updateOne(
            { CoachID: CoachID },
            {
              $set: newData,
              $push: {
                Updation: [
                  {
                    ByID: req.user.gid,
                    ByName: req.user.name,
                    OnDate: new Date(),
                    Updates: updatedThings,
                  },
                ],
              },
            }
          )
            .then(async () => {
              let enterData = await CoachesList.findOne({ CoachID });
              console.log("The renter data", enterData);
              getCoachList(req,res);
            })
            .catch((err) => {
              console.log("errr", err);

              return res.status(500).json({ error: "Server Error" });
            });
        } else {
          return res.json("Nothing to update");
        }
      }
      asyncPutCall();
    });
  } catch (err) {
    console.log("errr", err);
    // logger.error(`Catch Block - User List Request Block ${err}`, { by: req.user.gid, for: [0], info: {} })
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
});

router.delete("/deletecoach/:CoachID", auth, async (req, res) => {
  console.log("In Delete Course", req.params, req.query);
  try {
    const deleteCourse = req.params.CoachID;
    await CoachesList.updateOne(
      { CoachID: deleteCourse },
      {
        $set: {
          Status: "Deleted",
          "Deletion.ByID": req.user.gid,
          "Deletion.ByName": req.user.gid,
          "Deletion.OnDate": new Date(),
          "Deletion.DeleteReason": req.user.gid,
        },
      }
    );

    getCoachList(req, res);
  } catch (err) {
    console.log("errr", err);
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
});

// router.put("/photo/:ID", auth, async (req, res) => {
//   console.log("Back to Photo Update ");
//   uploadController.multipleUpload(req, res, function (err) {
//     if (err) {
//       console.log("Error Photo Submission", err);
//       return res.end("Error uploading file.");
//     }
//     console.log("Main Func", req.body);
//     const CoachID = req.params.ID || "ID-6";
//     console.log({ CoachID }, req.Avatar);
//     try {
//       async function asyncCall() {
//         const ans = await CoachesList.updateOne(
//           { CoachID: CoachID },
//           {
//             $set: { Avatar: req.ImgFileData },
//             $push: {
//               Updation: [
//                 {
//                   ByID: req.user.gid,
//                   ByName: req.user.name,
//                   OnDate: new Date(),
//                   Updates: updatedThings,
//                 },
//               ],
//             },
//           }
//         );
//         return res.status(200).json({ Result: "Photo uploaded successfully" });
//       }
//       // asyncCall();
//       return res.status(200).json({ Result: "Photo uploaded successfully" });
//     } catch (err) {
//       console.error(err.message);
//       return res.status(500).json({ error: "Server Error" });
//     }
//   });
// });

module.exports = router;
