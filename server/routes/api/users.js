const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult, Result } = require("express-validator");
// const autheticate = require('../../middleware/autheticate');
const auth = require("../../middleware/auth");
// const normalize = require('normalize-url');
// const authConstantBackend = require('../../authConstants');
const User = require("../../models/User");
const uploadController = require("../../middleware/uploadMultipleFiles");
const FirebaseUser = require("../../models/FirebaseUser");
require("dotenv").config();

async function getUsersList(req, res) {
  console.log("In get Users List");
  let NewList = await User.find({ Status: "Active" }, { _id: 0, Password: 0 });
  console.log("first", NewList.length);

  return res.status(200).json({ List: NewList });
}
router.get("/getuserslist", async (req, res) => {
  console.log("In request Get Users List ");
  try {
    getUsersList(req, res);
  } catch (err) {
    // logger.error(`Catch Block - User List Request Block ${err}`, { by: req.user.gid, for: [0], info: {} })
    console.log("Error ", err);
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
});

router.post("/addnewuser", auth, async (req, res) => {
  console.log("In add new user post request");
  try {
    uploadController.multipleUpload(req, res, function (err) {
      if (err) {
        console.log("Error Photo Submission", err);
        return res.end("Error uploading file.");
      }
      const data = req.body;
      console.log("Userss ", data);
      async function asyncCall() {
        let totalNumber = await User.countDocuments();
        totalNumber = totalNumber >= 1 ? totalNumber + 1 : 1;
        data.UserID = `USR-${totalNumber}`;
        const password = "Agile@AW20**";
        const salt = await bcrypt.genSalt(10);
        data.Password = await bcrypt.hash(password, salt);

        data.Created = {};
        data.Created.ByID = req.user.gid;
        data.Created.ByName = req.user.name;

        FinalData = new User(data);
        console.log("Final Data", FinalData);
        await FinalData.save()
          .then(() => {
            getUsersList(req, res);
            // return res.status(200).json({ data: "Success" });
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

router.delete("/deleteuser/:UserID", auth, async (req, res) => {
  console.log("In Delete Course", req.params, req.query);
  try {
    const deleteUser = req.params.UserID;
    await User.updateOne(
      { UserID: deleteUser },
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

    getUsersList(req, res);
  } catch (err) {
    console.log("errr", err);
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
});

router.put("/updateuser/:UserID", auth, async (req, res) => {
  try {
    uploadController.multipleUpload(req, res, function (err) {
      if (err) {
        console.log("Error Photo Submission", err);
        return res.end("Error uploading file.");
      }
      console.log("In request Update Indiv User Data ", req.params, req.body);
      async function asyncPutCall() {
        const UserID = req.params.UserID;
        const newData = req.body;
        let oldData = await User.findOne({ UserID });
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
          await User.updateOne(
            { UserID: UserID },
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
              let enterData = await User.findOne({ UserID });
              console.log("The renter data", enterData);
              getUsersList(req, res);
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

router.post("/firebaseuserdata", async (req, res) => {
  console.log("In add firebase user data");
  try {
    const data = req.body.user;
    console.log("Userss ", data);
    async function asyncCall(user) {
      // if (user.lastLoginAt) {
      // } else {
      let totalNumber = await FirebaseUser.countDocuments();
      totalNumber = totalNumber >= 1 ? totalNumber + 1 : 1;
      var UserID = `FBUSR-${totalNumber}`;

      // console.log("Final Data", FinalData);
      await FirebaseUser.updateOne(
        { Email: user.email },
        {
          $setOnInsert: {
            UserID,
            Name: user?.displayName,
            Email: user?.email,
            Mobilenumber: user?.providerData?.phoneNumbr || user?.phoneNumbr,
            FirebaseProvider: req.body?.providerName || "UserWithEmailPassword",
            // LoginData: Date.now(),
          },
          $push: { LoginData: Date.now() },
        },
        { upsert: true }
      )
        .then(() => {
          // getUsersList(req, res);
          return res.status(200).json({ data: "Success" });
        })
        .catch((err) => {
          console.log("Errot", err);
          return res.status(500).json({ error: `Problem in Storing to MongoDB: ${err}` });
        });
      // await FinalData.save()
      //   .then(() => {
      //     // getUsersList(req, res);
      //     return res.status(200).json({ data: "Success" });
      //   })
      //   .catch((err) => {
      //     console.log("Errot", err);
      //     return res.status(500).json({ error: `Problem in Storing to MongoDB: ${err}` });
      //   });
      // }
    }
    asyncCall(data);
    // return res.status(200).json({ data: "Success" });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
});
router.put("/firebaseuserupdates", async (req, res) => {
  console.log("In add firebase user updating data", req.body);
  try {
    async function asyncCall(req) {
      const email = req.body.email;
      const submitData = req.body.Updates;
      console.log("Userss ", submitData);
      await FirebaseUser.updateOne(
        { Email: email },
        {
          $set: submitData,
        }
      )
        .then(() => {
          async function getUser(email) {
            console.log("In get Users List");
            const b = await FirebaseUser.find({ Email: email });
            console.log("first", b);
          }
          getUser(email);
          console.log("Afer submit");
          return res.status(200).json({ data: "Success" });
        })
        .catch((err) => {
          console.log("Errot", err);
          return res.status(500).json({ error: `Problem in Storing to MongoDB: ${err}` });
        });
    }
    asyncCall(req);
    // return res.status(200).json({ data: "Success" });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
});

// async function getUsersList(req, res) {}
router.get("/getfirebaseuserupdates", async (req, res) => {
  console.log("In request Get Firebase Users List ",req.query);
  try {
    console.log("In get Firebase Users List");
    let userData = await FirebaseUser.findOne({Email: req.query.email });
    console.log('UUUU',userData)
    return res.status(200).json(userData);
  } catch (err) {
    // logger.error(`Catch Block - User List Request Block ${err}`, { by: req.user.gid, for: [0], info: {} })
    console.log("Error ", err);
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
});

module.exports = router;
