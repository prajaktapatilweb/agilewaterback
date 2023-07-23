import { FaRegCalendarAlt, FaRegHospital } from 'react-icons/fa';
import { FiMap, FiUsers } from 'react-icons/fi';
import { HiOutlineAcademicCap, HiOutlineChartSquareBar } from 'react-icons/hi';
import {
  RiCustomerService2Line,
  RiDashboardLine,
  RiShieldUserLine,
  RiTodoLine,
} from 'react-icons/ri';
import { BiCarousel, BiCartAlt, BiErrorAlt } from 'react-icons/bi';
import {
  BsBriefcase,
  BsCart4,
  BsChatDots,
  BsCurrencyBitcoin,
  BsQuestionDiamond,
} from 'react-icons/bs';
import { DiHtml5Multimedia } from 'react-icons/di';
import {
  MdOutlineAnalytics,
  MdOutlineContactPhone,
  MdOutlineContactSupport,
  MdOutlineDns,
  MdOutlineManageAccounts,
} from 'react-icons/md';
import { CgFeed } from 'react-icons/cg';
import { ImFeed, ImLab } from 'react-icons/im';
import { GrDatabase, GrNavigate } from 'react-icons/gr';
import { VscTable, VscTools } from 'react-icons/vsc';
import { AiOutlineLayout, AiOutlineUnorderedList } from 'react-icons/ai';

const routesConfig = [
  {
    id: 'menu1',
    title: 'Coaching',
    messageId: 'menu.coach',
    type: 'group',
    children: [
      {
        id: 'menu11',
        messageId: 'menu.coach.agile',
        type: 'item',
        // url: '/trialpages/homepage',
        url: '/agile-coaching/'
      },
      {
        id: 'menu12',
        messageId: "menu.coach.life",
        type: 'item',
        url: '/life-coaching/'
      },
      {
        id: 'menu13',
        messageId: "menu.coach.car",
        type: 'item',
        url: '/career-coaching/'
      },
      {
        id: 'menu14',
        messageId: 'menu.coach.sm',
        type: 'item',
        url: '/scrum-master-coaching/'
      },
    ],
  },
  {

    id: "menu2",
    messageId: "menu.cert",
    type: "group",
    // url: "/apgi-conf/#"
    children: [
      {
        id: "menu21",
        messageId: "menu.cert.safe",
        type: "group",
        // url: "/apgi-conf/#"
        type: 'collapse',
        children: [
          {
            id: "menu211",
            messageId: "menu.cert.safe.agile",
            type: "item",

            url: "/safe-agile-certification"
          },
          {
            id: "menu212",
            messageId: "menu.cert.scm",
            type: "item",
            url: "/safe-scrum-master-certification/"
          },
          {
            id: "menu213",
            messageId: "menu.cert.ascm",
            type: "item",
            url: "/safe-advanced-scrum-master/"
          },
          {
            id: "menu214",
            messageId: "menu.cert.spopm",
            type: "item",
            url: "/safe-popm-certification/"
          },
          {
            id: "menu215",
            messageId: "menu.cert.arch",
            type: "item",
            url: "/safe-for-architects/"
          },
        ]
      },
      {
        id: "menu22",
        messageId: "menu.cert.ScrumScale",
        type: "item",
        url: "/scrum-at-scale/"
      },
      {
        id: "menu23",
        messageId: "menu.cert.ScrMaster",
        type: "group",
        // url: "/apgi-conf/#"
        type: 'collapse',
        children: [
          {
            id: "menu231",
            messageId: "menu.cert.scm",
            type: "item",
            url: "/safe-scrum-master-certification/"
          },
          {
            id: "menu232",
            messageId: "menu.cert.ascm",
            type: "item",
            url: "/safe-advanced-scrum-master/"
          },
          {
            id: "menu233",
            messageId: "menu.cert.ScrMasterCer",
            type: "item",
            url: "/scrum-master-certifications-csm-psm-smc/"
          },
          {
            id: "menu234",
            messageId: "menu.cert.CSM",
            type: "item",
            url: "/scrum-master-certification-pune-europe-america/"
          },
          {
            id: "menu235",
            messageId: "menu.cert.ACSM",
            type: "item",
            url: "/advanced-scrum-master-training/"
          },
          {
            id: "menu236",
            messageId: "menu.cert.ScrMasters",
            type: "item",
            url: "/scrum-master-certification/"
          },
          {
            id: "menu237",
            messageId: "menu.cert.PSM",
            type: "item",
            url: "/professional-scrum-master-certification/"
          },
          {
            id: "menu238",
            messageId: "menu.cert.PSM2",
            type: "item",
            url: "/professional-scrum-master-2-certification-training/"
          },
          {
            id: "menu239",
            messageId: "menu.cert.CSP-CM",
            type: "item",
            url: "/certified-scrum-professional-scrummaster-csp-sm/"
          },
          {
            id: "menu2310",
            messageId: "menu.certmessageId:.SMC",
            type: "item",
            url: "/scrum-master-certified-smc-certification-training/"
          },
          {
            id: "menu2311",
            messageId: "menu.cert.SMCQues",
            type: "item",
            url: "/scrum-master-interview-prepration/"
          },
        ]
      },
      {
        id: "menu24",
        messageId: "menu.cert.ProOwn",
        type: "group",
        // url: "/apgi-conf/#"
        type: 'collapse',
        children: [

          {
            id: "menu241",
            messageId: "menu.cert.ProOwn1",
            type: "item",
            url: "/safe-popm-certification/"
          },
          {
            id: "menu242",
            messageId: "menu.cert.ProOwn2",
            type: "item",
            url: "/cspo-certification-training/"
          },
          {
            id: "menu243",
            messageId: "menu.cert.ProOwn3",
            type: "item",
            url: "/pspo/"
          },
          {
            id: "menu244",
            messageId: "menu.cert.ProOwn4",
            type: "item",
            url: "/product-owner-certification/"
          },
          {
            id: "menu245",
            messageId: "menu.cert.ProOwn5",
            type: "item",
            url: "/scrum-product-owner-certified-spoc/"
          },
          {
            id: "menu246",
            messageId: "menu.cert.ProOwn6",
            type: "item",
            url: "/advanced-certified-scrum-product-owner-acspo/"
          },
        ]
      },
      {
        id: "menu25",
        messageId: "menu.cert.AgileCoach",
        type: "group",
        // url: "/apgi-conf/#"
        type: 'collapse',
        children: [

          {
            id: "menu251",
            messageId: "menu.cert.AgileCoach1",
            type: "item",
            url: "/agile-coaching-all-certifications/"
          },
          {
            id: "menu252",
            messageId: "menu.cert.AgileCoach2",
            type: "item",
            url: "/agile-coaching-masterclass-bootcamp/"
          },
          {
            id: "menu253",
            messageId: "menu.cert.AgileCoach3",
            type: "item",
            url: "/agile-coaching-certification/"
          },
          {
            id: "menu254",
            messageId: "menu.cert.AgileCoach4",
            type: "item",
            url: "/icagile-apm-certification/"
          },
          {
            id: "menu255",
            messageId: "menu.cert.AgileCoach5",
            type: "item",
            url: "/icp-cat-agile-coaching-transition-certification/"
          },
          {
            id: "menu256",
            messageId: "menu.cert.AgileCoach6",
            type: "item",
            url: "/icp-ent-enterprise-agile-coaching-certification/"
          },
          {
            id: "menu257",
            messageId: "menu.cert.AgileCoach7",
            type: "item",
            url: "/psychological-safety/"
          },
          {
            id: "menu258",
            messageId: "menu.cert.AgileCoach8",
            type: "item",
            url: "/agile-leadership-journey/"
          },
          {
            id: "menu259",
            messageId: "menu.cert.AgileCoach9",
            type: "item",
            url: "/icp-atf-certification/"
          },
          {
            id: "menu2510",
            messageId: "menu.cert.AgileCoach10",
            type: "item",
            url: "/icagile-lea-certification/"
          },
          {
            id: "menu2511",
            messageId: "menu.cert.AgileCoach11",
            type: "item",
            url: "/business-agility-foundation-training/"
          },
          {
            id: "menu2512",
            messageId: "menu.cert.AgileCoach12",
            type: "item",
            url: "/icagile-fundamentals/"
          },

        ]
      },
      {
        id: "menu26",
        messageId: "menu.cert.DevOps",
        type: "group",
        // url: "/apgi-conf/#"
        type: 'collapse',
        children: [

          {
            id: "menu261",
            messageId: "menu.cert.DevOps1",
            type: "item",
            url: "/devops-professional-certification/"
          },
          {
            id: "menu262",
            messageId: "menu.cert.DevOps2",
            type: "item",
            url: "/devops-master-certification/"
          },
        ]
      },
      {
        id: "menu270",
        messageId: "menu.cert.PMI-ACP",
        type: "item",
        url: "/pmi-acp-certification/"
      },
      {
        id: "menu27",
        messageId: "menu.cert.ProManage",
        type: "group",
        // url: "/apgi-conf/#"
        type: 'collapse',
        children: [

          {
            id: "menu271",
            messageId: "menu.cert.ProManage1",
            type: "item",
            url: "/icagile-apm-certification/"
          },
          {
            id: "menu272",
            messageId: "menu.cert.ProManage2",
            type: "item",
            url: "/pmp-project-management-certification-training/"
          },
          {
            id: "menu273",
            messageId: "menu.cert.ProManage3",
            type: "item",
            url: "/prince2/"
          },
          {
            id: "menu274",
            messageId: "menu.cert.ProManage4",
            type: "item",
            url: "/tbr-training-back-of-the-room/"
          },
        ]
      },
      {
        id: "menu28",
        messageId: "menu.cert.SixSigCer",
        type: "item",
        url: "/six-sigma-certification/"
      },
      {
        id: "menu29",
        messageId: "menu.cert.CloudComp",
        type: "group",
        // url: "/apgi-conf/#"
        type: 'collapse',
        children: [

          {
            id: "menu291",
            messageId: "menu.cert.CloudComp1",
            type: "item",
            url: "/internet-of-things-foundation-certification-iot/"
          },
          {
            id: "menu292",
            messageId: "menu.cert.CloudComp2",
            type: "item",
            url: "/artificial-intelligence-essentials-ai-certification/"
          },
          {
            id: "menu293",
            messageId: "menu.cert.CloudComp3",
            type: "item",
            url: "/blockchain-foundation-certification/"
          },
          {
            id: "menu294",
            messageId: "menu.cert.CloudComp4",
            type: "item",
            url: "/blockchain-essentials-certification/"
          },
          {
            id: "menu295",
            messageId: "menu.cert.CloudComp5",
            type: "item",
            url: "/cloud-virtualization-essentials-cloud-computing-certification/"
          },
          {
            id: "menu296",
            messageId: "menu.cert.CloudComp6",
            type: "item",
            url: "/cloud-technology-associate-certification-cta-ccc/"
          },
        ]
      }
    ]
  },
  {
    id: "menu3",
    messageId: "menu.cert.Mentoring",
    type: "item",
    url: "/talk-to-mentor/"
  },
  {
    id: "menu4",
    messageId: "menu.cert.Resourses",
    type: "group",
    // url: "/apgi-conf/#"
    // type: 'collapse',
    children: [

      {
        id: "menu41",
        messageId: "menu.cert.Resourses1",
        type: "item",
        url: "/apgi-conf/"
      },
      {
        id: "menu42",
        messageId: "menu.cert.Resourses2",
        type: "item",
        url: "/blog/"
      },
      {
        id: "menu43",
        messageId: "menu.cert.Resourses3",
        type: "group",
        // url: "/apgi-conf/#"
        type: 'collapse',
        children: [

          {
            id: "menu431",
            messageId: "menu.cert.Resourses31",
            type: "item",
            url: "/safe-quiz/SAFe"
          },
          {
            id: "menu432",
            messageId: "menu.cert.Resourses32",
            type: "item",
            url: "/kanban-quiz/"
          },
          {
            id: "menu433",
            messageId: "menu.cert.Resourses33",
            type: "item",
            url: "/project-management-quiz/"
          },
          {
            id: "menu434",
            messageId: "menu.cert.Resourses34",
            type: "item",
            url: "/scrum-quiz/"
          },]
      },
      {
        id: "menu44",
        messageId: "menu.cert.Resourses4",
        type: "item",
        url: "/free-course/"
      },
      {
        id: "menu45",
        messageId: "menu.cert.Resourses5",
        type: "item",
        url: "/free-agile-workshop/"
      },
      {
        id: "menu5",
        messageId: "menu.cert.Recruitment",
        type: "item",
        url: "/careers/"
      },
    ]
  },
  {
    id: "menu6",
    messageId: "menu.cert.Contactus",
    type: "item",
    url: "/contact-us/"
  },
  {
    id: "menu7",
    messageId: "menu.cert.Career",
    type: "item",
    url: "/careers/"
  }
];


export default routesConfig;

