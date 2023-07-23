const spreadsheetIdBK = process.env.BACKUP_SHEET_ID;
const moment = require('moment');
const {addSpreadSheetValues} = require('../../../Database/googleSheetsService');
const axios = require('axios').default;

async function sendWhatsappMsg(msg_body_to_send, auth, token, from, template) {
  // async function sendWhatsappMsg(msg_body_to_send, auth, token, from, template:{templateName,parameters:[1,2]}) {
  console.log('Message', msg_body_to_send, template, from);
  const date = moment(Date.now()).format('DD MMM YYYY @ HH:mm:SS');
  axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url:
      'https://graph.facebook.com/v12.0/104784185860232/messages?access_token=' +
      token,
    data: template
      ? {
          messaging_product: 'whatsapp',
          to: from,
          type: 'template',
          template: {
            name: template.templateName,
            language: {code: 'en_US'},
          },
          components: [
            {
              type: 'body',
              parameters: [
                {type: 'text', text: `'${template.data[0]}'`},
                {type: 'text', text: `${template.data[1]}`},
              ],
            },
          ],
          headers: {'Content-Type': 'application/json'},
        }
      : {
          /// This data is as given below for answer to user question. It should be different as wrote in google sheet for template based and bussiness initiatted message.
          messaging_product: 'whatsapp',
          to: from,
          text: {body: msg_body_to_send},
          headers: {'Content-Type': 'application/json'},
        },
  })
    .then((response) => {
      // console.log('Reseponseee', JSON.stringify(response.data, null, 2));
      async function testfunction(response) {
        const response4 = await addSpreadSheetValues({
          spreadsheetId: spreadsheetIdBK,
          auth,
          sheetName: 'Sent!A1',
          data: [
            [
              date,
              from,
              msg_body_to_send.slice(0, 100),
              response?.data?.messages[0].id,
            ],
          ],
        });
      }
      testfunction(response);
    })
    .catch((err) => {
      console.log(err);
      return;
    });
}

async function sendMarketingWhatsappMsg(
  msg_body_to_send,
  auth,
  token,
  from,
  template,
) {
  // async function sendWhatsappMsg(msg_body_to_send, auth, token, from, template:{templateName,parameters:[1,2]}) {
  console.log('MArketing Message', msg_body_to_send, template, from);
  const date = moment(Date.now()).format('DD MMM YYYY @ HH:mm:SS');
  axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url:
      'https://graph.facebook.com/v16.0/101741292935985/messages?access_token=' +
      token,
    data: template
      ? {
          messaging_product: 'whatsapp',
          to: from,
          type: 'template',
          template: {
            name: template.templateName,
            language: {code: 'en_US'},
          },
          components: [
            {
              type: 'body',
              parameters: [
                {type: 'text', text: `'${template.data[0]}'`},
                {type: 'text', text: `${template.data[1]}`},
              ],
            },
          ],
          headers: {'Content-Type': 'application/json'},
        }
      : {
          /// This data is as given below for answer to user question. It should be different as wrote in google sheet for template based and bussiness initiatted message.
          messaging_product: 'whatsapp',
          to: from,
          text: {body: msg_body_to_send},
          headers: {'Content-Type': 'application/json'},
        },
  })
    .then((response) => {
      // console.log('Reseponseee', JSON.stringify(response.data, null, 2));
      async function testfunction(response) {
        const response4 = await addSpreadSheetValues({
          spreadsheetId: spreadsheetIdBK,
          auth,
          sheetName: 'Marketing-Sent!A1',
          data: [
            [date, from, msg_body_to_send, response?.data?.messages[0].id],
          ],
        });
      }
      testfunction(response);
    })
    .catch((err) => {
      console.log(err);
      return;
    });
}
module.exports = {sendWhatsappMsg, sendMarketingWhatsappMsg};
