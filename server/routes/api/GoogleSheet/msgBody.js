const {
  getSpreadSheetValues,
  putSpreadSheetValues,
  addSpreadSheetValues,
} = require('../../../Database/googleSheetsService');
const {sendWhatsappMsg} = require('./sendWhatsapp');

const spreadsheetId = process.env.SHEET_ID;
const spreadsheetIdBK = process.env.BACKUP_SHEET_ID;
const token = process.env.WHATSAPP_TOKEN;
const moment = require('moment');
const date = Date.now();

function generateText(objValueName, {personName, personposition, from}) {
  const msg_List = {
    default:
      'This is automated WhatsApp account, you will get response only for valid keywords',
    notRegister:
      'This number is not registered with us. We will contact you shortly.',
    register: `Hello *${personName}* \n, you have been registered with 1to1Guru as *${personposition}*.`,
    newregister: `You have registered *${personName}* as a *${personposition}* in 1to1guru database.`,
    newRegEnquiry1: `The Mobile Number ${from} is trying to register and it is not registered yet.\n`,
    newRegEnquiry2: `Please do registration with the following format \n NEWREG-MobNumber(with country code)-Name-Position`,
    noauthenticated: 'You are not authorized to perform this task',
    mobileNumber:
      'Please enter correct 10 digit Mobile Number with country code \n',
    position:
      'Please enter valid position from one of the following: Teacher/Student/Employee \n',
    pttError:
      'Not a Valid format \n Please use the following format to get the past schedule of lectures. \n pasttimetable-ddmmyyyy-ddmmyyyy \n first date is FROM and second date is TO \n Note: The date difference should not be greater than 31 days',
  };
  return (msg_body_to_send = msg_List[objValueName]);
}

async function generateMsgBodytoSend(rec_msg_Body, auth, from) {
  try {
    console.log(rec_msg_Body);
    const response = await getSpreadSheetValues({
      spreadsheetId: spreadsheetIdBK,
      sheetName: 'List!A2:D1000',
      auth,
    });
    const UserList = response.data.values;
    let selectedItem = (searchItem) =>
      UserList[UserList.findIndex((elem) => elem.includes(searchItem))];
    let template = [];

    let row = UserList.findIndex((elem) => elem.includes(from));
    let personName = row >= 0 ? UserList[row][1] : null;
    let personposition = row >= 0 ? UserList[row][2] : null;
    console.log('Data Tracked', personName, personposition);

    let received_text = rec_msg_Body.split('-');
    console.log(received_text);

    let msg_body_to_send = '';
    let TT_msg_body_to_send = '';
    let new_msg_to_send = '';
    // switch (personposition) {
    //     case 'CEO': case 'Director': case 'Incharge': msg_body_to_send = generateText('register', {})
    //         break; case 'Employee': break; case 'Teacher': break; case 'Student': break; case 'Parent': break; default: break;
    // }

    switch (received_text[0].toUpperCase()) {
      case 'REGISTER':
      case 'REG':
        msg_body_to_send = generateText(
          personposition == null ? 'notRegister' : 'register',
          {
            personName,
            personposition,
          },
        );
        if (personposition == null) {
          new_msg_to_send = generateText('newRegEnquiry1', {from});
          new_msg_to_send += generateText('newRegEnquiry2', {});
          console.log(new_msg_to_send);
          let empMobileNumber = selectedItem('NEWREG')[0];
          sendWhatsappMsg(new_msg_to_send, auth, token, empMobileNumber);
        }
        break;
      case 'NEWREG':
      case 'NEWREGISTER':
        console.log(
          'in Add REgisttration ',
          received_text[1]?.length,
          received_text[1]?.length <= 10 || received_text[1]?.length > 12,
        );
        if (selectedItem('NEWREG')[0] == from) {
          if (received_text[1] && received_text[2] && received_text[3]) {
            if (
              received_text[1]?.length <= 10 ||
              received_text[1]?.length > 12
            ) {
              msg_body_to_send = generateText('mobileNumber', {});
            } else {
              if (
                !['TEACHER', 'STUDENT', 'EMPLOYEE'].includes(
                  received_text[3].toUpperCase(),
                )
              ) {
                msg_body_to_send = generateText('position', {});
                msg_body_to_send += generateText('newRegEnquiry2', {});
              }
            }
          } else {
            msg_body_to_send = generateText('newRegEnquiry2', {});
          }
          if (!msg_body_to_send) {
            const response1 = await addSpreadSheetValues({
              spreadsheetId: spreadsheetIdBK,
              auth,
              sheetName: 'List!A1',
              data: [
                [
                  received_text[1],
                  received_text[2],
                  received_text[3].toUpperCase(),
                ],
              ],
            });
            msg_body_to_send = generateText('newregister', {
              personName: received_text[2],
              personposition: received_text[3],
            });
            new_msg_body_to_send = generateText('register', {
              personName: received_text[2],
              personposition: received_text[3],
            });
            template = {
              templateName: 'newlyregister',
              data: [received_text[2], received_text[3]],
            };
            console.log('template', template);
            // sendWhatsappMsg(new_msg_body_to_send, auth, token, received_text[1], template)
          }
        } else {
          msg_body_to_send = generateText('noauthenticated', {});
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
        // console.log('Date', date, 'From Date', fromDate);
        const fromDate = moment(date).format('DD MMM YYYY');
        console.log('Date', date, 'From Date', fromDate);
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
        console.log('here', personposition);
        switch (personposition) {
          case 'TEACHER':
            teacherListIndex = ListofLectures.filter(
              (elem) => elem.includes(personName) && elem[0] !== 'Deleted',
            );
            teacherListIndex.map((item, i) => {
              TT_msg_body_to_send += `${i + 1}-> ID : ${item[7]} - On ${
                item[4]
              } @ ${item[6]}  ${item[13]} (${item[16]}) ${item[17]} \n\n`;
              countLectures = countLectures + 1;
            });
            break;
          case 'STUDENT':
            teacherListIndex = ListofLectures.filter(
              (elem) => elem.includes(personName) && elem[0] !== 'Deleted',
            );
            teacherListIndex.map((item, i) => {
              TT_msg_body_to_send += `${i + 1}-> ID : ${item[7]} - On ${
                item[4]
              } @ ${item[6]}  ${item[12]} (${item[16]}) ${item[17]} \n\n`;
              countLectures = countLectures + 1;
            });
            break;
          case 'DIRECTOR':
          case 'EMPLOYEE':
          case 'CEO':
          case 'INCHARGE':
            if (received_text[3]) {
              // Received_text[3] should be same as the teacher name written in sheet ex. "Rupali Mutha "
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
              console.log('here');
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
            ? `Hello *${personName}*, \n ${countLectures} Lecture are Scheduled between ${fromDate} to ${toDate}. Details are as Follows \n\n ${TT_msg_body_to_send}`
            : `Hello *${personName}*, \n ${countLectures} Lecture are Scheduled between ${fromDate} to ${toDate}. `;

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
            switch (personposition) {
              case 'TEACHER':
                teacherPastListIndex = ListofPastLectures.filter((elem) =>
                  elem.includes(personName),
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
              case 'STUDENT':
                teacherPastListIndex = ListofPastLectures.filter((elem) =>
                  elem.includes(personName),
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
              case 'DIRECTOR':
              case 'EMPLOYEE':
              case 'CEO':
              case 'INCHARGE':
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
                ? `Hello *${personName}*, \n ${countPastLectures} Lecture are Scheduled between ${fromPastDate} to ${toPastDate}. Details are as Follows \n\n ${TT_msg_body_to_send}`
                : `Hello *${personName}*, \n ${countPastLectures} Lecture are Scheduled between ${fromPastDate} to ${toPastDate}. `;
          } else {
            msg_body_to_send = generateText('pttError', {});
          }
        } else {
          msg_body_to_send = generateText('pttError', {});
        }

        // console.log(msg_body_to_send)
        break;
      case 'L':
      case 'LECT':
      case 'LECTURE':
        // If Student / Teacher Lecture Cancel / Reschedule request can be asked
        // for Cancel L-ID-Cancel
        // for Reschedule L-ID-Reschedule-Date(dd/mm/yy@hh:mm)
        console.log('Lecture');
      default:
        msg_body_to_send = generateText('default', {});
        break;
    }
    return msg_body_to_send;
  } catch (error) {
    console.log('ERrror', error);
  }
}

module.exports = {generateMsgBodytoSend};
