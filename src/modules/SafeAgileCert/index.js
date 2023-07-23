import React from 'react';
import Imagepara from './Imagepara';
import Videodemo from './Videodemo';
import CourseTable from './CourseTable';
import RelatedCourses from 'modules/commanmodules/RelatedCourses';
import Safetest from './Safetest';
import Safeinfo from './Safeinfo.js';
import { Grid, Link } from '@mui/material';
import { Container } from '@mui/material';
import { AppCard } from '@crema';
import MainSafeaccord from './MainSafeaccord';
import SafePricingcard from './SafePricingcard';
import SlideBasicArrow from 'modules/commanmodules/SlideBasicArrow';
import { courseList2 } from 'modules/Constant/Relatecoursedata';

export default function SafeAgileCert() {
  return (
    <>
      <Imagepara />
      <Grid container>
        <Container sx={{ maxWidth: { xl: 1450 }, marginTop: 10 }}>

          <Grid container direction="row"
            justifyContent="space-evenly"
            alignItems="center" spacing={{ xs: 4, md: 8 }}>
            <Grid item xs={12} md={8}>
              <CourseTable />

            </Grid>
            <Grid item xs={12} md={4}>
              <SlideBasicArrow />
            </Grid>

            <Grid item xs={12} md={8}>
              <AppCard sxStyle={{ p: 5 }}>
                <Safeinfo />
                <MainSafeaccord />
              </AppCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <Videodemo videoPromo={'sd'} />
              <Safetest />
            </Grid>
          </Grid>
          <Grid container spacing={{ xs: 4, md: 8 }}>
            <Grid item xs={12} md={8} sx={{ pb: 7 }}>
              <SafePricingcard />
            </Grid>
            <Grid item xs={12} md={4} sx={{ pb: 7 }}>
              <RelatedCourses data={courseList2} />
            </Grid>
          </Grid>
        </Container>
      </Grid>
      {/* <Userfooter /> */}
      {/* <Whatsappnew /> */}
    </>
  );
}
