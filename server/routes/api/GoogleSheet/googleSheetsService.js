// googleSheetsService.js

const {google} = require('googleapis');
const sheets = google.sheets('v4');
// const path = require('path');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// const CREDENTIALS_PATH = path.join(process.cwd(), 'keys.json');
// const CREDENTIALS_PATH = require('./keys')
const {newobj} = require('./key');

async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
    // keyFilename: CREDENTIALS_PATH,
    // credentials: CREDENTIALS_PATH,
    credentials: newobj,
  });
  const authToken = await auth.getClient();
  return authToken;
}

// async function getSpreadSheet({spreadsheetId, auth}) {
//   const res = await sheets.spreadsheets.get({
//     spreadsheetId,
//     auth,
//   });
//   return res;
// }

// To get data of the Sheet from the given range
async function getSpreadSheetValues({spreadsheetId, auth, sheetName}) {
  // console.log('first', spreadsheetId, auth, sheetName)
  // console.log('FFFFFF',auth.email)
  // auth = auth1
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName,
  });
  // console.log('first',res)
  return res;
}

async function clearSpreadSheetValues({
  action,
  spreadsheetId,
  auth,
  sheetName,
}) {
  const res = await sheets.spreadsheets.values.clear({
    spreadsheetId,
    auth,
    range: sheetName,
  });
  return res;
}

// To Add new data of the Sheet at the given position
async function addSpreadSheetValues({spreadsheetId, auth, sheetName, data}) {
  console.log('data ADD', data);
  const res = await sheets.spreadsheets.values.append({
    auth, //auth object
    spreadsheetId, //spreadsheet id
    // range: 'TimeTable!B9:C9', //sheet name and range of cells
    range: sheetName, //sheet name and range of cells
    valueInputOption: 'USER_ENTERED', // The information will be passed according to what the usere passes in as date, number or text
    resource: {
      values: data,
      // values: [["Class", "Subject"]],
    },
  });
  console.log('Finished');
  return res;
}

async function putSpreadSheetValues({spreadsheetId, auth, sheetName, data}) {
  console.log('data', data);
  const res = await sheets.spreadsheets.values.update({
    auth, //auth object
    spreadsheetId, //spreadsheet id
    range: sheetName, //sheet name and range of cells
    valueInputOption: 'USER_ENTERED', // The information will be passed according to what the usere passes in as date, number or text
    resource: {
      values: data,
    },
  });
  return res;
}

module.exports = {
  getAuthToken,
  // getSpreadSheet,
  clearSpreadSheetValues,
  getSpreadSheetValues,
  putSpreadSheetValues,
  addSpreadSheetValues,
};
