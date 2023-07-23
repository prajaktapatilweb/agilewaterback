import { AppCard, AppGridContainer, AppInfoView } from '@crema';
import AppDialog from '@crema/core/AppDialog';
import IntlMessages from '@crema/utility/IntlMessages';
import {
  Box,
  Button,
  CardHeader,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CourseData,
  getLectureRateData,
  onGetAnalyticsData,
} from 'redux/actions';
import { Fonts } from 'shared/constants/AppEnums';
import EnhancedTable from '../../commanmodules/EnhancedTable';
// import UserTableComman from "modules/commanmodules/UserTableComman";

export default function CourseTable() {
  const dispatch = useDispatch();
  // React.useEffect(() => {
  //     dispatch(CourseData);
  // }, [dispatch])
  // useEffect(() => {
  //   dispatch(onGetAnalyticsData());
  // }, [dispatch]);

  const analyticsData = useSelector(({ dashboard }) => dashboard.analyticsData);

  // const CourseData = useSelector((state) => state.PayRelated.lectureRate);

  const rows1 = analyticsData?.rows;
  const columns1 = analyticsData?.columns;
  console.log('first12', rows1, columns1);
  // const [selectedRow, setSelectedRow] = useState()
  // const [isDialogOpen, setisDialogOpen] = useState(false)
  // const toggleDialogOpen = () => {
  //     setisDialogOpen(!isDialogOpen)
  //     setSelectedRow()
  // };

  const rows = [
    createData(
      'SAFE',
      '25 - 26 Jul 2023',
      'Online',
      '9:30 AM - 5:30 pm',
      305,
      'DEF',
    ),
    createData(
      'Agile',
      '5 - 6 Jul 2023',
      'Online',
      '9:30 AM - 5:30 pm',
      452,
      'xYZ',
    ),
    createData(
      'Agile Certification',
      '11 - 12 Jul 2023',
      'Online',
      '9:30 AM - 5:30 pm',
      262,
      'ABC',
    ),
    createData(
      'Safe',
      '10 - 16 Jul 2023',
      'Online',
      '9:30 AM - 5:30 pm',
      159,
      'ABC',
    ),
  ];
  function createData(Course, date1, City, Time, Cost, Trainer) {
    return {
      Course,
      date1,
      City,
      Time,
      Cost,
      Trainer,
      action: 'Register',
    };
  }
  //   const columns = [
  //     {
  //       id: 'name',
  //       numeric: false,
  //       label: 'Dessert (100g serving)',
  //     },
  //     {
  //       id: 'calories',
  //       numeric: true,
  //       label: 'Calories',
  //     },
  //     {
  //       id: 'fat',
  //       numeric: true,
  //       label: 'Fat (g)',
  //     },
  //     {
  //       id: 'carbs',
  //       numeric: true,
  //       label: 'Carbs (g)',
  //     },
  //     {
  //       id: 'protein',
  //       numeric: true,
  //       label: 'Protein (g)',
  //     },
  //     {
  //       id: 'action',
  //       numeric: false,
  //       label: 'Action',
  //     },
  //   ];
  var columns = [
    {
      id: 'Course',
      numeric: false,
      label: 'Course',
    },
    {
      id: 'date1',
      numeric: false,
      label: 'Date',
    },
    {
      id: 'City',
      numeric: false,
      label: 'City',
    },
    {
      id: 'Time',
      numeric: false,
      label: 'Time (IST)',
    },
    {
      id: 'Cost',
      numeric: true,
      label: 'Cost (INR)',
    },
    {
      id: 'Trainer',
      numeric: false,
      label: 'Trainer',
    },
    {
      id: 'action',
      numeric: false,
      label: 'Registeration',
    },
  ];
  console.log('second', rows, columns);
  return (
    <Container>
      {rows && columns && (
        <>
          <AppGridContainer>
            <Grid item xs={12} md={12}>

              {/* <AppCard
                title={
                  <>
                    {/* <h3>Teachers and Lecture Category wise Rates</h3>
                    <Box component='p' sx={{ color: 'text.secondary' }}>
                      Standared Lecture Rates are given in heading
                    </Box> *
                  </>
                }
                contentStyle={{ px: 0, textAlign: 'center' }}
              > */}

              <EnhancedTable
                rows={rows}
                headCells={columns}
                // TableTitle='Agile'
                mainColumn='name'
                orderByColumn='calories'
              // selectedRow={selectedRow}
              // setSelectedRow={setSelectedRow}
              // setisDialogOpen={setisDialogOpen}
              />
              {/* </AppCard> */}
            </Grid>
          </AppGridContainer>
          {/* <AppDialog
                        open={isDialogOpen}
                        onClose={toggleDialogOpen}
                        title={`Teacher ID:  ${selectedRow?.name}`}
                    >
                        <AddTeacherRates
                            selectedIDData={selectedNewTeacher}
                            toggleEdit={toggleDialogOpen}
                            LectureCategoryData={LectureCategoryData}
                        /> 
                    sds
                </AppDialog> */}
        </>
      )}
      <AppInfoView />
    </Container>
  );
}
