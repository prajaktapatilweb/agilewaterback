import React from 'react';
import Button from '@mui/material/Button';
import {
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import {Formik, Field, Form} from 'formik';
// import FormikRadioGroup from '../../formik/FormikRadioGroup';
// import CustomizedSelectFormik from '../../formik/CustomizedSelectFormik';
// import CustomizedCheckboxFormik from '../../formik/CustomizedCheckboxFormik';
import * as yup from 'yup';
import AppInfoView from '@crema/core/AppInfoView';
import Box from '@mui/material/Box';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
// import { useAuthUser } from '@crema/utility/AuthHooks';
import {Fonts} from '../../../shared/constants/AppEnums';
// import CheckboxGroup from '../../formik/CheckboxGroup';
// import { useJWTAuth, userDefJWTRoleAuth, } from '@crema/services/auth/jwt-auth/JWTAuthProvider';
// import { userDefJWTRoleuser } from '@crema/utility/AuthHooks';
import jwtAxios from '../../../@crema/services/auth/jwt-auth/index';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IntlMessages from '@crema/utility/IntlMessages';
import CircularProgress from '@mui/material/CircularProgress';
import {green} from '@mui/material/colors';
import CustomizedSelectFormik from 'modules/commanmodules/Formik/CustomizedSelectFormik';
import {
  CourseOptions,
  TitleOptions,
  TrainerList,
} from 'modules/Constant/CommanConst';
import DateTimePicker from '@mui/lab/DateTimePicker';
import moment from 'moment';
import {DatePicker} from '@mui/lab';
import {onPostNewCourseData} from 'redux/actions';
import {useDispatch} from 'react-redux';

// import Notistack from 'modules/Testing/Notistack';
// import ReactTostify from 'modules/Testing/ReactTostify';

// Yup Form Validation
const validationSchema = yup.object({
  CourseName: yup.string().required(
    <>
      <IntlMessages id='course' /> required !
    </>,
  ),
  Time: yup.string().required(
    <>
      <IntlMessages id='Course.time' /> required !
    </>,
  ),
  Place: yup.string().required(
    <>
      <IntlMessages id='Course.place' /> required !
    </>,
  ),
  Trainer: yup.string().required(
    <>
      <IntlMessages id='Course.trainer' /> required !
    </>,
  ),
  Cost: yup.object().shape({
    Actual: yup.string().required(
      <>
        <IntlMessages id='Course.actualcost' /> required !
      </>,
    ),
    Discounted: yup.string().required(
      <>
        <IntlMessages id='Course.discost' /> required !
      </>,
    ),
  }),
  StartDate: yup.date().required(
    <>
      <IntlMessages id='common.startDate' /> required !
    </>,
  ),
  // .max(new Date(), intl.formatMessage({ id: 'start_date.error.max' }))
  EndDate: yup
    .date()
    .required('It is required field')
    .when(['StartDate'], (StartDate, schema) => {
      return schema.test({
        test: (EndDate) => {
          if (!EndDate) return true;
          return EndDate >= StartDate;
        },
        message: 'Event Delete Date should be after the start date',
      });
    }),

  EventDeleteDate: yup
    .date()
    .required('It is required field')
    .when(['StartDate'], (StartDate, schema) => {
      return schema.test({
        test: (EventDeleteDate) => {
          if (!EventDeleteDate) return true;
          return EventDeleteDate >= StartDate;
        },
        message: 'Event Delete Date should be after the start date',
      });
    }),
});

const AddCourseForm = () => {
  // console.log('Begining of SignupJWTAuth');
  // Varibles and Function for alert dialogue
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const [dialogaction, setDialogaction] = React.useState('');
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  // Varible for checkbox It is use to store the earlier field data
  // Form Submission Function
  const onSubmit = async (data, {setSubmitting, resetForm}) => {
    console.log('Signup Form Submission', data);
    setSubmitting(true);
    dispatch(onPostNewCourseData({data, resetForm}));
    setSubmitting(false);
  };
  const initialValues = {
    CourseName: '',
    StartDate: '',
    EndDate: '',
    Time: '9:30 am to 05:30 pm',
    Cost: {Actual: '', Discounted: ''},
    Place: '',
    Trainer: '',
    EventDeleteDate: '',
  };

  return (
    <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
      <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', m: 15}}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={true}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            isValidating,
            touched,
            setFieldValue,
            isSubmitting,
          }) => (
            // {/* {(data, errors, isValidating, isSubmitting) => ( */}
            <Form style={{textAlign: 'left'}} noValidate autoComplete='off'>
              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
              <Grid container sx={{mb: {xs: 4, xl: 5}}} spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl
                    sx={{
                      width: '100%',
                      '&.MuiInputBase-input': {fontSize: 14},
                    }}
                  >
                    <InputLabel id='demo-simple-select-label'>
                      <IntlMessages id='course' />
                    </InputLabel>
                    <Field
                      name='CourseName'
                      options={CourseOptions}
                      component={CustomizedSelectFormik}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl
                    sx={{
                      width: '100%',
                      '&.MuiInputBase-input': {fontSize: 14},
                    }}
                  >
                    <InputLabel id='demo-simple-select-label'>
                      <IntlMessages id='Course.trainer' />
                    </InputLabel>
                    <Field
                      name='Trainer'
                      options={TrainerList}
                      component={CustomizedSelectFormik}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                </Grid>
                <Grid
                  container
                  justifyContent='space-between'
                  spacing={2}
                  p={2}
                >
                  {/* <DateTimePicker
                    autoOk
                    format='YYYY/MM/DD'
                    variant='inline'
                    inputVariant='outlined'
                    label={<IntlMessages id='common.startDate' />}
                    name='StartDate'
                    value={values.StartDate}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(value) => setFieldValue('StartDate', value)}
                  /> */}
                  <Grid item>
                    <DatePicker
                      autoOk
                      format='YYYY/MM/DD'
                      variant='inline'
                      inputVariant='outlined'
                      label={<IntlMessages id='common.startDate' />}
                      name='StartDate'
                      value={values.StartDate}
                      slotProps={{
                        textField: {
                          helperText: 'MM/DD/YYYY',
                        },
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(value) =>
                        setFieldValue(
                          'StartDate',
                          value,
                          // moment.utc(value).format('YYYY/MM/DD'),
                        )
                      }
                    />
                    {errors.StartDate ? (
                      <Typography color='red'>{errors.StartDate}</Typography>
                    ) : (
                      <Typography>MM/DD/YYYY</Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <DatePicker
                      autoOk
                      format='YYYY/MM/DD'
                      variant='inline'
                      inputVariant='outlined'
                      label={<IntlMessages id='common.endDate' />}
                      name='EndDate'
                      value={values.EndDate}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(value) =>
                        setFieldValue(
                          'EndDate',
                          value,
                          // moment(value).format('YYYY/MM/DD'),
                        )
                      }
                    />
                    {errors.EndDate ? (
                      <Typography color='red'>{errors.EndDate}</Typography>
                    ) : (
                      <Typography>MM/DD/YYYY</Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <DatePicker
                      autoOk
                      format='YYYY/MM/DD'
                      variant='inline'
                      inputVariant='outlined'
                      label={<IntlMessages id='common.delDate' />}
                      name='EventDeleteDate'
                      value={values.EventDeleteDate}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(value) =>
                        setFieldValue(
                          'EventDeleteDate',
                          value,
                          // moment(value).format('YYYY/MM/DD'),
                        )
                      }
                    />
                    {errors.EventDeleteDate ? (
                      <Typography color='red'>
                        {errors.EventDeleteDate}
                      </Typography>
                    ) : (
                      <Typography>MM/DD/YYYY</Typography>
                    )}
                  </Grid>
                </Grid>
                {/* <Grid continer  direction="row" xs={12}  justifyContent="space-evenly"> */}
                {/* <Grid item md={6} xs={12}>

                  <Typography variant='h4' sx={{my: 3}}>
                    The Demo Lecture is scheduled on :
                    <strong>
                      {moment(values.StartDate).format(
                        'ddd, DD MMM YYYY @ HH:mm',
                      )}
                    </strong>
                  </Typography>
                </Grid> */}
                <Grid item xs={6} md={3}>
                  <AppTextField
                    label={<IntlMessages id='Course.actualcost' />}
                    disabled={values.isSubmitting}
                    name='Cost.Actual'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      '&.MuiInputBase-input': {fontSize: 14},
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <AppTextField
                    label={<IntlMessages id='Course.discost' />}
                    name='Cost.Discounted'
                    disabled={values.isSubmitting}
                    variant='outlined'
                    sx={{
                      width: '100%',
                      '&.MuiInputBase-input': {fontSize: 14},
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <AppTextField
                    label={<IntlMessages id='Course.time' />}
                    disabled={values.isSubmitting}
                    name='Time'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      '&.MuiInputBase-input': {fontSize: 14},
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <AppTextField
                    label={<IntlMessages id='Course.place' />}
                    disabled={values.isSubmitting}
                    name='Place'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Button
                  variant='contained'
                  color='primary'
                  disabled={values.isValidating || values.isSubmitting}
                  sx={{
                    mt: {xs: 5, xl: 6},
                    minWidth: 160,
                    fontWeight: Fonts.REGULAR,
                    fontSize: 16,
                    textTransform: 'capitalize',
                    padding: '8px 16px 8px',
                  }}
                  type='submit'
                >
                  Submit
                </Button>
              </Grid>
              {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
            </Form>
          )}
        </Formik>
      </Box>

      <Box sx={{color: 'grey.500'}}></Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle sx={{color: 'white', backgroundColor: `${dialogaction}`}}>
          <h2>
            Form submission {dialogaction === 'red' ? 'Failed' : 'Success'}
          </h2>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{mt: 5}}>{msg} Thank you !</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
      <AppInfoView />
    </Box>
  );
};

export default AddCourseForm;
