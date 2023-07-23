const {
  getSpreadSheetValues,
  putSpreadSheetValues,
  addSpreadSheetValues,
} = require('../../../Database/googleSheetsService');
const {sendMarketingWhatsappMsg} = require('./sendWhatsapp');

const spreadsheetId = process.env.SHEET_ID;
const spreadsheetIdBK = process.env.BACKUP_SHEET_ID;
const token = process.env.MARKETING_WHATSAPP_TOKEN;
const moment = require('moment');
const date = Date.now();
const Employees = [{Name: 'Arti', WAP_MB: '918976745055'}];

function generateText(objValueName, {rec_msg_Body, from}) {
  const msg_List = {
    default:
      'Thank you for contacting us. One of our education consultants will get back to you shortly.',
    positiveResponse:
      'Thank you for your interest. One of our education consultants will get back to you shortly to schedule a demo lecture.',
    // conveyResponse_Marketin_Executive: `The Mobile Number ${from} clicked on the Book A Free Demo Button of WhataApp Marketing. Please take followup.`,
    conveyResponse_Marketin_Executive: `The Mobile Number ${from} sent a message to our WhatsApp Marketing. \n The message is \n\n ${rec_msg_Body}`,
  };
  return (msg_body_to_send = msg_List[objValueName]);
}

async function generateMarketing_MsgBodytoSend(rec_msg_Body, auth, from) {
  try {
    console.log(rec_msg_Body);
    let msg_body_to_send = '';
    let new_msg_to_send = '';
    let empMobileNumber = Employees[0].WAP_MB;
    let template = {};
    switch (rec_msg_Body) {
      case 'Book A Free Demo Lecture':
        msg_body_to_send = generateText('positiveResponse', {});
        new_msg_to_send = generateText('conveyResponse_Marketin_Executive', {
          from,
          rec_msg_Body,
        });
        console.log(new_msg_to_send, msg_body_to_send);
        template = {templateName: 'toemployee', data: [from, rec_msg_Body]};
        console.log('template', template);
        sendMarketingWhatsappMsg(new_msg_to_send, auth, token, empMobileNumber);
        // sendMarketingWhatsappMsg(new_msg_to_send, auth, token, empMobileNumber, template);
        sendMarketingWhatsappMsg(msg_body_to_send, auth, token, from);
        break;
      case 'Stop promotions':
        msg_body_to_send = 'Blank';
        break;
      default:
        new_msg_to_send = generateText('conveyResponse_Marketin_Executive', {
          from,
          rec_msg_Body,
        });
        msg_body_to_send = generateText('default', {});
        template = {templateName: 'toemployee', data: [from, rec_msg_Body]};
        console.log('template in Defualt ', template);
        sendMarketingWhatsappMsg(new_msg_to_send, auth, token, empMobileNumber);
        // sendMarketingWhatsappMsg(new_msg_to_send, auth, token, empMobileNumber, template);
        sendMarketingWhatsappMsg(msg_body_to_send, auth, token, from);
        break;
    }
    return msg_body_to_send;
  } catch (error) {
    console.log('ERrror', error);
  }
}

module.exports = {generateMarketing_MsgBodytoSend};
