const express = require('express');
const {
  getAuthToken,
  getSpreadSheetValues,
} = require('../../Database/googleSheetsService');
const {indexof} = require('stylis');
const router = express.Router();

router.get('/googlesheet', async (req, res) => {
  const spreadsheetId = process.env.SHEET_ID;
  console.log('In request google sheet ');
  const auth = await getAuthToken();
  try {
    var sheetName = 'DataSheet!A24:K';
    var responseRec = await getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth,
    });
    RecRowData = responseRec.data.values;
    var sheetName = 'DataSheet!A23:K23';
    var responseRec = await getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth,
    });
    RecColData = responseRec.data.values;

    var columns = [
      {
        id: 'Course',
        numeric: false,
        label: 'Course',
      },
      {
        id: 'Date',
        numeric: false,
        label: 'Date',
      },
      {
        id: 'City',
        numeric: false,
        label: 'City',
      },
      {
        id: 'Time (IST)',
        numeric: false,
        label: 'Time (IST)',
      },
      {
        id: 'Time (EDT)',
        numeric: false,
        label: 'Time (EDT)',
      },
      {
        id: 'Cost (INR)',
        numeric: true,
        label: 'Cost (INR)',
      },
      {
        id: 'Cost (USD)',
        numeric: true,
        label: 'Cost (USD)',
      },
      {
        id: 'Trainer',
        numeric: false,
        label: 'Trainer',
      },
      {
        id: 'action',
        numeric: false,
        label: 'Registeration',
      },
    ];
    var rows = [];
    // console.log('Row', typeof RecRowData[0][1]);
    console.log('Col', RecColData);
    // RecRowData.map((item1) => {
    for (i = 0; i <= RecRowData.length - 1; i++) {
      var arrayElement = RecRowData[i];
      // console.log('ARRA', arrayElement);
      var rowObject = {};
      columns.map((colItem, j) => {
        // console.log(colItem.label, RecColData[0].indexOf(colItem.label));
        const index = RecColData[0].indexOf(colItem.label);
        if (index > 0) {
          rowObject[colItem.label] = arrayElement[index];
        } else {
          switch (colItem.label) {
            case 'Cost (INR)':
              // rowObject[colItem.label] = {
              //   1: arrayElement[6],
              //   2: arrayElement[7],
              // };
              break;
            case 'Cost (USD)':
              // rowObject[colItem.label] = {
              //   1: arrayElement[7],
              //   2: arrayElement[8],
              // };
              break;
            case 'Registeration':
              rowObject.action = 'Registratoin';
              break;
            default:
              break;
          }
        }
      });
      rows.push(rowObject);
    }
    console.log(rowObject);
    // logger.info('User List Request Successful', { by: req.user.gid, for: [0], info: {} })
    return res.status(200).json({rows, columns});
  } catch (err) {
    // logger.error(`Catch Block - User List Request Block ${err}`, { by: req.user.gid, for: [0], info: {} })
    return res.status(500).json({error: `Server Error: ${err}`});
  }
});
module.exports = router;
