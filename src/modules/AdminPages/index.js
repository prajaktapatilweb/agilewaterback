import {useJWTAuthMethod} from '@crema/utility/AuthHooks';
import {Button, Typography} from '@mui/material';
import React, {useState} from 'react';
import TopHeading from './TopHeading';

export default function AdminPage() {
  return (
    <>
      <TopHeading title='Dashboard' />
      <Typography variant='h1' m={5}>
        Welcome Admin{' '}
      </Typography>
    </>
  );
}
