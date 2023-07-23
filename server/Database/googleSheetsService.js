// googleSheetsService.js

const {google} = require('googleapis');
const sheets = google.sheets('v4');
const {newobj} = require('./key');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
    credentials: newobj,
  });
  const authToken = await auth.getClient();
  return authToken;
}

// To get data of the Sheet from the given range
async function getSpreadSheetValues({spreadsheetId, auth, sheetName}) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName,
  });
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

// To Update the cells values
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
  clearSpreadSheetValues,
  getSpreadSheetValues,
  putSpreadSheetValues,
  addSpreadSheetValues,
};
