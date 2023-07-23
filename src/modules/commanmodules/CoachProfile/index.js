import React, { useEffect } from 'react';
import ListItem1 from './ListItem';
import AppInfoView from '@crema/core/AppInfoView';
import { Grid, Box } from '@mui/material';
import { AppGridContainer } from '@crema';

const CoachProfile = ({ data }) => {
  console.log('sss', data)

  return (
    <Box sx={{ my: 7 }}>

      {DataTransfer ? (
        // <Grid container spacing={4} alignItems='stretch'>
        <AppGridContainer>
          {
            data.map((user, id) => (
              <Grid item xl={3} lg={4} md={4} sm={6} xs={12} sx={{ display: 'flex', mx: { xs: 4, sm: 0 } }}>
                <ListItem1 user={user} key={id} />
              </Grid>
            ))
          }
        </AppGridContainer>
        // </Grid>
      ) : null
      }

      <AppInfoView />
    </Box>

  );
};

export default CoachProfile;
