const {
  getSpreadSheetValues,
  putSpreadSheetValues,
  addSpreadSheetValues,
} = require('./googleSheetsService');
const {sendWhatsappMsg} = require('./sendWhatsapp');

const spreadsheetId = process.env.SHEET_ID;
const spreadsheetIdBK = process.env.BACKUP_SHEET_ID;
const token = process.env.WHATSAPP_TOKEN;
const moment = require('moment');
const date = Date.now();

async function generateMsgBodytoSend(rec_msg_Body, auth, from) {
  try {
    const response = await getSpreadSheetValues({
      spreadsheetId: spreadsheetIdBK,
      sheetName: 'List!A2:D1000',
      auth,
    });
    const StaffList = response.data.values;

    let row = StaffList.findIndex((elem) => elem.includes(from));
    let teacherName = row >= 0 ? StaffList[row][1] : null;
    let position = row >= 0 ? StaffList[row][2] : null;
    console.log(rec_msg_Body);
    let received_text = rec_msg_Body.split('-');
    console.log(received_text);
    let msg_body_to_send = '';
    let TT_msg_body_to_send = '';
    let new_msg_to_send = '';
    console.log('Data Tracked', teacherName, position);

    if (
      teacherName == null &&
      (received_text[0].toUpperCase() !== 'REGISTER' ||
        received_text[0].toUpperCase() !== 'REG')
    ) {
      msg_body_to_send =
        'This number is not register in our contact list. Contact our representative to register this number.';
      return msg_body_to_send;
    }
    // console.log('Received TExt-separated', received_text[0], '2', received_text[1], received_text[2], received_text[3])
    switch (received_text[0].toUpperCase()) {
      case 'REGISTER':
      case 'REG':
        msg_body_to_send =
          teacherName == null
            ? 'Your number is not found in our contact list. We will contact you shortly.'
            : `Hello *${teacherName}* \n You have been registered with 1to1Guru as *${position}*.`;
        if (teacherName == null) {
          new_msg_to_send = `The Mobile ${from} is trying to register and it is not registered yet. \nDo registration with following code 
                    \n NEWREG-MobNumber(with country code)-Name-Position`;
          let empMobileNumber =
            StaffList[
              StaffList.findIndex((elem) => elem.includes('NEWREG'))
            ][0];
          sendWhatsappMsg(new_msg_to_send, auth, token, empMobileNumber);
        }
        break;
      case 'NEWREG':
      case 'NEWREGISTER':
        console.log('in Add REgisttration ');
        msg_body_to_send =
          received_text[1].length <= 10 || received_text[1].length > 12
            ? 'Please enter Correct 10 digit Mobile Number with counry code \n NEWREG-MobNumber(with country code)-Name-Position'
            : !['Teacher', 'Student', 'Employee'].includes(received_text[3])
            ? 'Please enter valid positions any one from Teacher/Student/Employee'
            : null;
        if (msg_body_to_send) {
          sendWhatsappMsg(msg_body_to_send, auth, token, from);
        } else {
          const response1 = await addSpreadSheetValues({
            spreadsheetId: spreadsheetIdBK,
            auth,
            sheetName: 'List!A1',
            data: [[received_text[1], received_text[2], received_text[3]]],
          });
          msg_body_to_send = `Hello *${received_text[2]}* \n You have been registered with 1to1Guru as *${received_text[3]}*.`;
          sendWhatsappMsg(msg_body_to_send, auth, token, received_text[1]);
        }
        break;
      case 'TIMETABLE':
      case 'TT':
        const unit =
          received_text[2] == 'd' || received_text[2] == 'D'
            ? 'd'
            : received_text[2] == 'w' || received_text[2] == 'W'
            ? 'w'
            : received_text[2] == 'm' || received_text[2] == 'M'
            ? 'M'
            : 'd';
        const fromDate = moment(date).format('DD MMM YYYY');
        const toDate = moment(date)
          .add(received_text[1], unit)
          .format('DD MMM YYYY');
        const response2 = await putSpreadSheetValues({
          spreadsheetId,
          auth,
          sheetName: 'ViewScheduleLectureData!E5:E6',
          data: [[fromDate], [toDate]],
        });
        const response3 = await putSpreadSheetValues({
          spreadsheetId,
          auth,
          sheetName: 'ViewScheduleLectureData!C1',
          data: [[2]],
        });
        const response4 = await getSpreadSheetValues({
          spreadsheetId,
          sheetName: 'ViewScheduleLectureData!A8:R',
          auth,
        });
        const ListofLectures = response4.data.values;
        let teacherListIndex = [];
        let countLectures = 0;
        // console.log('List',teacherListIndex[7],teacherListIndex[4],teacherListIndex[13],teacherListIndex[17])
        switch (position) {
          case 'Teacher':
            teacherListIndex = ListofLectures.filter(
              (elem) => elem.includes(teacherName) && elem[0] !== 'Deleted',
            );
            teacherListIndex.map((item, i) => {
              TT_msg_body_to_send += `${i + 1}-> ID : ${item[7]} - On ${
                item[4]
              } @ ${item[6]}  ${item[13]} (${item[16]}) ${item[17]} \n\n`;
              countLectures = countLectures + 1;
            });
            break;
          case 'Student':
            teacherListIndex = ListofLectures.filter(
              (elem) => elem.includes(teacherName) && elem[0] !== 'Deleted',
            );
            teacherListIndex.map((item, i) => {
              TT_msg_body_to_send += `${i + 1}-> ID : ${item[7]} - On ${
                item[4]
              } @ ${item[6]}  ${item[12]} (${item[16]}) ${item[17]} \n\n`;
              countLectures = countLectures + 1;
            });
            break;
          case 'Director':
          case 'Employee':
          case 'CEO':
          case 'Incharge':
            if (received_text[3]) {
              console.log('first');
              (teacherListIndex = ListofLectures.filter(
                (elem) =>
                  elem.includes(received_text[3]) && elem[0] !== 'Deleted',
              )),
                teacherListIndex.map((item, i) => {
                  TT_msg_body_to_send += `${i + 1}-> ${item[0]} ID : ${
                    item[7]
                  } - On ${item[4]} @ ${item[6]}  ${item[12]} - ${item[13]} (${
                    item[16]
                  }) ${item[17]} \n\n`;
                  countLectures = countLectures + 1;
                });
            } else {
              ListofLectures.map((item, i) => {
                TT_msg_body_to_send += `${i + 1}->  ${item[0]} ID : ${
                  item[7]
                } - On ${item[4]} @ ${item[6]}   ${item[12]} - ${item[13]} (${
                  item[16]
                }) ${item[17]} \n\n`;
                countLectures = countLectures + 1;
              });
            }
            break;
          default:
            msg_body_to_send += '';
            break;
        }
        msg_body_to_send =
          countLectures >= 1
            ? `Hello *${teacherName}*, \n ${countLectures} Lecture are Scheduled between ${fromDate} to ${toDate}. Details are as Follows \n\n ${TT_msg_body_to_send}`
            : `Hello *${teacherName}*, \n ${countLectures} Lecture are Scheduled between ${fromDate} to ${toDate}. `;

        // console.log(msg_body_to_send)
        break;

      case 'PASTTIMETABLE':
      case 'PTT':
        if (received_text[1]) {
          const fromPastDate = moment({
            y: received_text[1].slice(4, 8),
            M: received_text[1].slice(2, 4) - 1,
            d: received_text[1].slice(0, 2),
          }).format('DD MMM YYYY');
          const toPastDate = moment({
            y: received_text[2].slice(4, 8),
            M: received_text[2].slice(2, 4) - 1,
            d: received_text[2].slice(0, 2),
          }).format('DD MMM YYYY');
          console.log(
            'DAte Differece',
            moment(toPastDate).diff(moment(fromPastDate), 'days'),
          );
          if (moment(toPastDate).diff(moment(fromPastDate), 'days') < 31) {
            const response9 = await putSpreadSheetValues({
              spreadsheetId,
              auth,
              sheetName: 'ViewScheduleLectureData!E5:E6',
              data: [[fromPastDate], [toPastDate]],
            });
            const response7 = await putSpreadSheetValues({
              spreadsheetId,
              auth,
              sheetName: 'ViewScheduleLectureData!C1',
              data: [[2]],
            });
            const response8 = await getSpreadSheetValues({
              spreadsheetId,
              sheetName: 'ViewScheduleLectureData!A8:R',
              auth,
            });
            const ListofPastLectures = response8.data.values;
            let teacherPastListIndex = [];
            let countPastLectures = 0;
            console.log('List', ListofPastLectures.length);
            switch (position) {
              case 'Teacher':
                teacherPastListIndex = ListofPastLectures.filter((elem) =>
                  elem.includes(teacherName),
                );
                teacherPastListIndex.map((item, i) => {
                  TT_msg_body_to_send += `${i + 1}-> ID : ${item[7]} - On ${
                    item[4]
                  } @ ${item[6]}  ${item[13]} (${item[16]}) ${item[0]} ${
                    item[2]
                  } Hr \n\n`;
                  countPastLectures = countPastLectures + 1;
                });
                break;
              case 'Student':
                teacherPastListIndex = ListofPastLectures.filter((elem) =>
                  elem.includes(teacherName),
                );
                teacherPastListIndex.map((item, i) => {
                  TT_msg_body_to_send += `${i + 1}-> ID : ${item[7]} - On ${
                    item[4]
                  } @ ${item[6]}  ${item[12]} (${item[16]}) ${item[0]} ${
                    item[2]
                  } Hr \n\n`;
                  countPastLectures = countPastLectures + 1;
                });
                break;
              case 'Director':
              case 'Employee':
              case 'CEO':
              case 'Incharge':
                if (received_text[3]) {
                  console.log('first');
                  (teacherPastListIndex = ListofPastLectures.filter((elem) =>
                    elem.includes(received_text[3]),
                  )),
                    teacherPastListIndex.map((item, i) => {
                      TT_msg_body_to_send += `${i + 1}-> ${item[0]} ID : ${
                        item[7]
                      } - On ${item[4]} @ ${item[6]}  ${item[12]} - ${
                        item[13]
                      } (${item[16]}) ${item[0]} ${item[2]} Hr \n\n`;
                      countPastLectures = countPastLectures + 1;
                    });
                } else {
                  ListofPastLectures.map((item, i) => {
                    TT_msg_body_to_send += `${i + 1}->  ${item[0]} ID : ${
                      item[7]
                    } - On ${item[4]} @ ${item[6]}   ${item[12]} - ${
                      item[13]
                    } (${item[16]}) ${item[0]} ${item[2]} Hr \n\n`;
                    countPastLectures = countPastLectures + 1;
                  });
                }
                break;
              default:
                msg_body_to_send += '';
                break;
            }
            console.log('GAgasdas', TT_msg_body_to_send.length);
            msg_body_to_send =
              countPastLectures >= 1
                ? `Hello *${teacherName}*, \n ${countPastLectures} Lecture are Scheduled between ${fromPastDate} to ${toPastDate}. Details are as Follows \n\n ${TT_msg_body_to_send}`
                : `Hello *${teacherName}*, \n ${countPastLectures} Lecture are Scheduled between ${fromPastDate} to ${toPastDate}. `;
          } else {
            msg_body_to_send =
              'Not Valid format Use follwing format to get earlier scheduled lectures \n pasttimetable-ddmmyyyy-ddmmyyyy \n first date is From and second date is To \n Also Note that the date difference should not be greater than 31 days';
          }
        } else {
          msg_body_to_send =
            'Not Valid format Use follwing format to get earlier scheduled lectures \n pasttimetable-ddmmyyyy-ddmmyyyy \n first date is From and second date is To';
        }

        // console.log(msg_body_to_send)
        break;
      default:
        msg_body_to_send =
          'This is automated whatsapp account so only for valid keywords you will get response';
        break;
    }
    return msg_body_to_send;
  } catch (error) {
    console.log('ERrror', error);
  }
  // TO get the list of Lectures Scheduled
  //  const staff='Bhanumati Patil'
}

module.exports = {generateMsgBodytoSend};
