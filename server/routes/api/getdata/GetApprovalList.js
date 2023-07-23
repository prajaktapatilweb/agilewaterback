const AllDemoList = require('../../../models/AllDemoList');
const Approval = require('../../../models/Approval');
const LectureCategory = require('../../../models/LectureCategory');
const Profile = require('../../../models/Profile');
const StudentsLeadsData = require('../../../models/StudentsLeadsData');
const TeacherCategoryRates = require('../../../models/TeacherCategoryRates');
const User = require('../../../models/User');
const logger = require('../../../services/Logger');
var _ = require('lodash');
const MonthlySalary = require('../../../models/MonthlySalary');
const ObjectID = require('mongodb').ObjectId;

module.exports = async function GetApprovalList(req, res) {
  selector = {};
  selector['meta.InformToJobPosition'] = req.roleNumber;
  selector['ApprovalStatus.Approved'] = {$ne: true};
  req.roleNumber >= 2
    ? (selector['meta.InformToDepartment'] = {$in: req.user.dept})
    : null;
  try {
    const ApprovalListData = await Approval.find(selector, {level: 0}).sort({
      timestamp: -1,
    });

    const LectRateData = await LectureCategory.find({}, {});
    // console.log('DDDD', LectRateData)
    const TeacherLectRateData = await TeacherCategoryRates.find({}, {});
    const demoListData = await AllDemoList.find({}, {__v: 0, _id: 1});
    const StudentLeadsData = await StudentsLeadsData.find({}, {__v: 0, _id: 1});
    const alluserData = await User.find(
      {},
      {date: 0, password: 0, __v: 0, role: 0, _id: 0},
    );
    const alluserNameIDData = await User.find(
      {},
      {name: 1, onetoOneID: 1, _id: 0},
    );
    const ProfileData = await Profile.find({}, {date: 0, __v: 0});
    const FinalApprovalList = [];
    const MonthlySalaryData = await MonthlySalary.find({});
    console.log('Total Approvals', ApprovalListData.length);
    // demoListData.filter(item => item.DemoStatus === 'Scheduled').map(ii => console.log('In MAp', ii.DemoID, ii.DemoStatus, ii.id, ii._id.toString() === '62ad4c4b32b3b54b90384525'))
    // demoListData.map(ii => console.log('In MAp', ii.DemoID, ii.DemoID === 'DEM-220847'),)
    // console.log(StudentLeasdsData.map(item => item.ApplicationID))

    ApprovalListData.forEach(function (element, i) {
      element.meta.PermAppID = element._id.toString();
      console.log(i, element.meta.Action);
      switch (element.meta.Action) {
        case 'TeacherMonthlySalaryDeleted':
          element.meta.MPAY = _.find(MonthlySalaryData, {
            PaymentMonthYear: element.meta.ActionOnUser,
          });
          FinalApprovalList.push(element);
          break;
        case 'TeacherMonthlySalaryDeleted':
          break;
        case 'LectureCategoryRateUpdated':
        case 'LectureCategoryRateAdded':
        case 'LectureCategoryRateDeleted':
          // _.merge(element, _.find(LectRateData, { LRID: element.meta.ActionOnUser.split(' &')[0] }))
          element.meta.FD = _.find(LectRateData, {
            LRID: element.meta.ActionOnUser.split(' &')[0],
          });
          // console.log('TTTTTT', element)
          FinalApprovalList.push(element);
          break;
        case 'TeachersLectureCategoryRateAdded':
        case 'TeachersLectureCategoryRateUpdates':
          element.meta.FD = _.find(TeacherLectRateData, {
            onetoOneID: element.meta.ActionOnUser.split(' &')[0],
          });
          FinalApprovalList.push(element);
          break;
        case 'DemoLectureScheduled':
          // _.merge(element, _.find(demoListData.filter(item => item.DemoStatus === 'Scheduled'), { _id: new ObjectId(element.meta.ActionOnUser) }))
          // _.merge(element, _.find(demoListData, { _id: new ObjectId(element.meta.ActionOnUser) }))
          element.meta.Demo = _.find(demoListData, {
            _id: new ObjectID(element.meta.ActionOnUser),
          });
          element?.meta?.Demo?.Label.LabelValue >= 302
            ? updateApprovalFunction(element.meta.PermAppID)
            : FinalApprovalList.push(element);
          break;

        case 'DemoDataDeleted':
          element.meta.Demo = _.find(demoListData, {
            _id: new ObjectID(element.meta.ActionOnUser),
          });
          FinalApprovalList.push(element);
          break;

        case 'ApproveDemoTeacher':
          const studID = element.meta.ActionOnUser.split(' & ')[0];
          const demoID = element.meta.ActionOnUser.split(' & ')[1] || '0';
          // _.merge(element, _.find(demoListData, { [fieldName]: UserName }))
          // console.log('ApproveDemoTeacher', element.meta.ActionOnUser, studID, demoID)
          element.meta.Stud = _.find(StudentLeadsData, {ApplicationID: studID});
          element.meta.Demo = _.find(demoListData, {DemoID: demoID});
          element?.meta?.Demo?.DemoStatus === 'Scheduled'
            ? updateApprovalFunction(element.meta.PermAppID)
            : FinalApprovalList.push(element);
          break;

        case 'Student Lead Data Deleted':
          // _.merge(element, _.find(StudentLeasdsData, { ApplicationID: element.meta.ActionOnUser }))
          if (typeof element.meta.ActionOnUser === 'string') {
            element.meta.Stud = _.find(StudentLeadsData, {
              ApplicationID: element.meta.ActionOnUser,
            });
          } else {
            element.meta.Stud = _.find(StudentLeadsData, {
              ApplicationID: element.meta.ActionOnUser[0],
            });
          }
          element?.meta?.Demo?.DemoStatus === 'Scheduled'
            ? updateApprovalFunction(element.meta.PermAppID)
            : FinalApprovalList.push(element);
          break;

        case 'User Deleted':
        case 'NewUserAdd':
          // _.merge(element, _.find(alluserData, { onetoOneID: element.meta.ActionOnUser }))
          element.meta.Stud = _.find(alluserData, {
            onetoOneID: element.meta.ActionOnUser,
          });
          FinalApprovalList.push(element);
          break;
        case 'Submitted:Financial Data':
        case 'Updated:Financial Data':
        case 'Submitted:Teaching Data':
        case 'Updated:Teaching Data':
        case 'Submitted:Personal Data':
        case 'Updated:Personal Data':
          element.meta.Profile = _.find(ProfileData, {
            uniqueUserID: element.meta.ActionOnUser,
          });
          // console.log(element.meta)
          FinalApprovalList.push(element);
          break;

        default:
          break;
      }
    });
    return res
      .status(200)
      .json({ApprovalList: FinalApprovalList, IDNameList: alluserNameIDData});
  } catch (err) {
    logger.error(`Catch Block - Apprval List Get Data request Error ${err}`, {
      by: req.user.gid || '',
      for: [0],
      info: {},
    });
    console.error(err.message);
    return res.status(500).json({UserData: 'Server Error'});
  }
};
