import {
  GET_ACADEMY_DATA,
  GET_COURSE_LIST,
  GET_CRM_DATA,
  GET_CRYPTO_DATA,
  ADD_NEW_COURSE,
  GET_HC_DATA,
  GET_METRICS_DATA,
  GET_WIDGETS_DATA,
} from 'shared/constants/ActionTypes';

const initialState = {
  courselist: null,
  result: null,
  crmData: null,
  cryptoData: null,
  metricsData: null,
  widgetsData: null,
  healthCare: null,
  academyData: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE_LIST:
      return {
        ...state,
        courselist: action.payload,
      };

    case ADD_NEW_COURSE:
      return {
        ...state,
        result: action.payload,
      };

    case GET_ACADEMY_DATA:
      return {
        ...state,
        academyData: action.payload,
      };

    case GET_CRM_DATA:
      return {
        ...state,
        crmData: action.payload,
      };

    case GET_CRYPTO_DATA:
      return {
        ...state,
        cryptoData: action.payload,
      };

    case GET_METRICS_DATA:
      return {
        ...state,
        metricsData: action.payload,
      };

    case GET_WIDGETS_DATA:
      return {
        ...state,
        widgetsData: action.payload,
      };

    case GET_HC_DATA:
      return {
        ...state,
        healthCare: action.payload,
      };

    default:
      return state;
  }
};
export default dashboardReducer;
