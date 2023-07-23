import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onGetUserList } from '../../../../redux/actions';
import ListItem from './ListItem';
import AppInfoView from '@crema/core/AppInfoView';
import Box from '@mui/material/Box';
import AppList from '../../../../@crema/core/AppList';
import { Grid } from '@mui/material';

const Standard = () => {
  const dispatch = useDispatch();
  var usersList = [
    {
      img:
        <img src='/assets/images/AboutUs.png'></img>,
      name: "Vijay",
      para: <span>Agile Coach,Career Coach,Life Coach
        Experience : 21+ Years India
        COACH SPECIALIZATIONS
        Corporate Coaching
        Leadership Coaching
        Organizational Development Coaching
        Work Life Balance Coaching</span>
    },
    {
      img: <img src="../assets/images/avatar/A1.jpg"></img>,
      name: "Vijay wade",
      para: <span>Agile Coach,Career Coach,Life Coach
        Experience : 21+ Years India
        COACH SPECIALIZATIONS
        Corporate Coaching
        Leadership Coaching
        Organizational Development Coaching
        Work Life Balance Coaching</span>
    },
  ]
  // const usersList = useSelector(({ userList }) => userList.usersList);
  // console.log("abc", usersList)

  // useEffect(() => {
  //   dispatch(onGetUserList());
  // }, [dispatch]);

  return (
    <Box flex={1}>
      {usersList ?
        <Grid container>
          {usersList.map(user =>
            <Grid lg={3}><ListItem user={user} key={user.id} /></Grid>
          )}
        </Grid>
        : null}

      <AppInfoView />
    </Box >
  );
};

export default Standard;
