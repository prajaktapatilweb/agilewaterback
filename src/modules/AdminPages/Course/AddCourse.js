import {Box, Card, Container} from '@mui/material';
import EnhancedTable from 'modules/commanmodules/EnhancedTable';
import React from 'react';
import TopHeading from '../TopHeading';
import AddCourseForm from './AddCourseForm';

export default function AddCourse() {
  return (
    <>
      <TopHeading title='Add New Course' />
      <Container container display='flex' sx={{width: '100%'}}>
        <Box
          display='flex'
          sx={{mt: {xs: 2, xl: 2}, boxShadow: 10, borderRadius: 5}}
        >
          {/* <SignupJwtAuth /> */}
          <AddCourseForm />
        </Box>
      </Container>
    </>
  );
}
