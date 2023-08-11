const express = require("express");
const { indexof } = require("stylis");
const auth = require("../../middleware/auth");
const CoursesList = require("../../models/CoursesList");
const router = express.Router();
const moment = require("moment");
const CoachesList = require("../../models/CoachesList");
const uploadController = require("../../middleware/uploadMultipleFiles");


async function getCoursList(req, res) {
  console.log("In get Course List");
  let NewList = await CoursesList.aggregate([
    { $match: { Status: "Active" } },
    {
      $project: {
        _id: 0,
        CourseID: 1,
        SdateParts: { $dateToParts: { date: "$StartDate" } },
        EdateParts: { $dateToParts: { date: "$EndDate" } },
        CourseName: 1,
        EventDeleteDate: 1,
        Place: 1,
        ActualCost: 1,
        DiscountedCost: 1,
        Date: 1,
        Time: 1,
        Trainer: 1,
      },
    },
    {
      $addFields: {
        Date: {
          $function: {
            body: function (StartDate, EndDate) {
              let mlst = [, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Sep", "Nov", "Dec"];
              let Eyear = `${EndDate.year}`.slice(2, 4);
              let Syear = `${StartDate.year}`.slice(2, 4);
              let datefinal =
                StartDate.year === EndDate.year
                  ? StartDate.month === EndDate.month
                    ? `${StartDate.day} - ${EndDate.day} ${mlst[EndDate.month]} ${Eyear}`
                    : `${StartDate.day} ${mlst[StartDate.month]} - ${EndDate.day} ${mlst[EndDate.month]} ${Eyear}`
                  : `${StartDate.day} ${mlst[StartDate.month]} ${Syear}- ${EndDate.day} ${mlst[EndDate.month]} ${Eyear}`;

              return datefinal;
            },
            args: ["$SdateParts", "$EdateParts"],
            lang: "js",
          },
        },
      },
    },
    {
      $project: {
        CourseID: 1,
        CourseName: 1,
        Place: 1,
        ActualCost: 1,
        DiscountedCost: 1,
        Date: 1,
        Time: 1,
        Trainer: 1,
        // isExpired: {
        //   // new field
        //   $cond: {
        //     if: { $gt: ["$EventDeleteDate", new Date()] },
        //     then: false,
        //     else: true,
        //   },
        // },
      },
    },
  ]);
  console.log("first", NewList.length);

  return res.status(200).json({ List: NewList });
}
router.get("/getcoachlist", auth, async (req, res) => {
  console.log("In request Get Coach List ");
  try {
    // updateStatus();
    // getCoursList(req, res);
    let NewList = await CoachesList.find({ Status: "Active" });
    console.log("first", NewList.length);
    return res.status(200).json({ List: NewList });
  } catch (err) {
    // logger.error(`Catch Block - User List Request Block ${err}`, { by: req.user.gid, for: [0], info: {} })
    console.log("Error ", err);
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
});

router.get("/getindividualcourse", async (req, res) => {
  console.log("In request Get Indiv Course Data ", req.query);
  // res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    let CourseData = await CoursesList.findOne(
      { CourseID: req.query.CourseID },
      {
        CourseID: 1,
        CourseName: 1,
        EndDate: 1,
        EventDeleteDate: 1,
        Place: 1,
        ActualCost: 1,
        DiscountedCost: 1,
        StartDate: 1,
        Time: 1,
        Trainer: 1,
        _id: 0,
      }
    );

    console.log("first", CourseData);

    return res.status(200).json({ CourseData });
  } catch (err) {
    // logger.error(`Catch Block - User List Request Block ${err}`, { by: req.user.gid, for: [0], info: {} })
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
});

router.post("/addnewcoach", auth, async (req, res) => {
  console.log("In add new Course router post request");
  try {
    uploadController.multipleUpload(req, res, function (err) {
      if (err) {
        console.log("Error Photo Submission", err);
        return res.end("Error uploading file.");
      }
      const CoachID = req.params.ID;
      const data = req.body;
      async function asyncCall() {
        let totalNumber = await CoachesList.countDocuments();
        totalNumber = totalNumber >= 1 ? totalNumber + 1 : 1;
        data.CoachID = `ID-${totalNumber}`;
        data.Avatar = req.Avatar;

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

router.put("/updatecourse/:CourseID", auth, async (req, res) => {
  console.log("In request Update Indiv Course Data ", req.params, req.body);
  try {
    const CourseID = req.params.CourseID;
    const newData = req.body.data;
    let oldData = await CoursesList.findOne({ CourseID });
    let updatedThings = [];
    let cnt = 0;

    for (const property in newData) {
      console.log("DDD", property);

      if (`${newData[property]}` !== `${oldData[property]}`) {
        if (property.includes("Date")) {
          if (`${oldData[property]}` !== `${new Date(newData[property])}`) {
            updatedThings.push({
              keyname: property,
              oldValue: oldData[property],
              newValue: newData[property],
            });
            cnt++;
          }
        } else {
          updatedThings.push({
            keyname: property,
            oldValue: oldData[property],
            newValue: newData[property],
          });
          cnt++;
        }
        // updatedString += `${property} : ${oldData[property]} --> ${newData[property]} \n`;
      }
    }
    console.log("first", cnt, updatedThings);

    if (cnt > 0) {
      console.log("To update");
      await CoursesList.updateOne(
        { CourseID: CourseID },
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
          let enterData = await CoursesList.findOne({ CourseID });
          console.log("The renter data", enterData);
          getCoursList(req, res);
        })
        .catch((err) => {
          console.log("errr", err);

          return res.status(500).json({ error: "Server Error" });
        });
    } else {
      return res.json("Nothing to update");
    }
  } catch (err) {
    console.log("errr", err);
    // logger.error(`Catch Block - User List Request Block ${err}`, { by: req.user.gid, for: [0], info: {} })
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
});

router.delete("/DeleteCourse/:CourseID", auth, async (req, res) => {
  console.log("In Delete Course", req.params, req.query);
  try {
    const deleteCourse = req.params.CourseID;
    await CoursesList.updateOne(
      { CourseID: deleteCourse },
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

    getCoursList(req, res);
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