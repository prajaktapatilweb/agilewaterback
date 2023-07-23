const express = require('express');
const {
  getAuthToken,
  getSpreadSheetValues,
} = require('../../Database/googleSheetsService');
const {indexof} = require('stylis');
const auth = require('../../middleware/auth');
const CoursesList = require('../../models/CoursesList');
const router = express.Router();

router.get('/getcourslist', auth, async (req, res) => {
  console.log('In request Get Course List ');
  try {
    let ActiveList = await CoursesList.find(
      {Status: 'Active'},
      {
        CourseName: 1,
        EndDate: 1,
        EventDeleteDate: 1,
        Place: 1,
        Cost: 1,
        StartDate: 1,
        Time: 1,
        Trainer: 1,
        _id: 0,
      },
    );
    console.log('Oist', ActiveList);
    // var columns = [
    //   {
    //     id: 'Course',
    //     numeric: false,
    //     label: 'Course',
    //   },
    //   {
    //     id: 'Date',
    //     numeric: false,
    //     label: 'Date',
    //   },
    //   {
    //     id: 'City',
    //     numeric: false,
    //     label: 'City',
    //   },
    //   {
    //     id: 'Time (IST)',
    //     numeric: false,
    //     label: 'Time (IST)',
    //   },
    //   {
    //     id: 'Time (EDT)',
    //     numeric: false,
    //     label: 'Time (EDT)',
    //   },
    //   {
    //     id: 'Cost (INR)',
    //     numeric: true,
    //     label: 'Cost (INR)',
    //   },
    //   {
    //     id: 'Cost (USD)',
    //     numeric: true,
    //     label: 'Cost (USD)',
    //   },
    //   {
    //     id: 'Trainer',
    //     numeric: false,
    //     label: 'Trainer',
    //   },
    //   {
    //     id: 'action',
    //     numeric: false,
    //     label: 'Registeration',
    //   },
    // ];
    // var rows = [];
    // console.log('Col', RecColData);
    // for (i = 0; i <= RecRowData.length - 1; i++) {
    //   var arrayElement = RecRowData[i];
    //   // console.log('ARRA', arrayElement);
    //   var rowObject = {};
    //   columns.map((colItem, j) => {
    //     // console.log(colItem.label, RecColData[0].indexOf(colItem.label));
    //     const index = RecColData[0].indexOf(colItem.label);
    //     if (index > 0) {
    //       rowObject[colItem.label] = arrayElement[index];
    //     } else {
    //       switch (colItem.label) {
    //         case 'Cost (INR)':
    //           // rowObject[colItem.label] = {
    //           //   1: arrayElement[6],
    //           //   2: arrayElement[7],
    //           // };
    //           break;
    //         case 'Cost (USD)':
    //           // rowObject[colItem.label] = {
    //           //   1: arrayElement[7],
    //           //   2: arrayElement[8],
    //           // };
    //           break;
    //         case 'Registeration':
    //           rowObject.action = 'Registratoin';
    //           break;
    //         default:
    //           break;
    //       }
    //     }
    //   });
    //   rows.push(rowObject);
    // }
    // console.log(rowObject);
    // logger.info('User List Request Successful', { by: req.user.gid, for: [0], info: {} })
    return res.status(200).json({List: ActiveList});
  } catch (err) {
    // logger.error(`Catch Block - User List Request Block ${err}`, { by: req.user.gid, for: [0], info: {} })
    return res.status(500).json({error: `Server Error: ${err}`});
  }
});

router.post('/addnewcourse', auth, async (req, res) => {
  console.log('In add new Course router post request', req.user);
  try {
    const data = req.body.data;
    let totalNumber = await CoursesList.countDocuments();
    totalNumber = totalNumber >= 1 ? totalNumber + 1 : 1;
    data.CourseID = `ID-${totalNumber}`;

    data.Created = {};
    data.Created.ByID = req.user.gid;
    data.Created.ByName = req.user.name;
    FinalData = new CoursesList(data);
    console.log('Final Data', FinalData);
    await FinalData.save()
      .then(() => {
        return res.status(200).json({data: 'Success'});
      })
      .catch((err) => {
        console.log('Errot', err);
        return res
          .status(500)
          .json({error: `Problem in Storing to MongoDB: ${err}`});
      });
  } catch (err) {
    console.log('Errot', err);
    return res.status(500).json({error: `Server Error: ${err}`});
  }
});
module.exports = router;
