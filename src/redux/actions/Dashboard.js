import React from 'react';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
  ADD_NEW_COURSE,
  GET_ACADEMY_DATA,
  GET_COURSE_LIST,
  GET_CRM_DATA,
  GET_CRYPTO_DATA,
  GET_ECOMMERCE_DATA,
  GET_HC_DATA,
  GET_METRICS_DATA,
  GET_WIDGETS_DATA,
} from 'shared/constants/ActionTypes';
import IntlMessages from '@crema/utility/IntlMessages';
import jwtAxios from '@crema/services/auth/jwt-auth';

export const onGetCourseList = () => {
  console.log('Redux Get Cours List ');
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/courses/getcourslist')
      .then((data) => {
        console.log('Data Rece REdux', data.data);
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_COURSE_LIST, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onPostNewCourseData = ({data, resetForm}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .post('/courses/addnewcourse', {data})
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: ADD_NEW_COURSE, payload: data.data});
          dispatch({
            type: SHOW_MESSAGE,
            payload: 'Data Added Succefully',
          });
          resetForm();
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetAcademyData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/dashboard/academy')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_ACADEMY_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetHCData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/dashboard/health_care')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_HC_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const onGetCryptoData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/dashboard/crypto')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_CRYPTO_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetCrmData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/dashboard/crm')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_CRM_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetMetricsData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/dashboard/metrics')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_METRICS_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetWidgetsData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    jwtAxios
      .get('/dashboard/widgets')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_WIDGETS_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
