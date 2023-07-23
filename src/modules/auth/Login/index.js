import React from 'react';
import Box from '@mui/material/Box';
import AuthWrapper from '../AuthWrapper';
import AppLogo from '../../../@crema/core/AppLayout/components/AppLogo';
import SigninJwtAuth from './SigninJwtAuth';

const Signin = () => {
  console.log('dddxxx');
  return (
    <AuthWrapper>
      <Box sx={{width: '100%'}}>
        <Box sx={{mb: {xs: 6, xl: 8}}}>
          <Box
            sx={{
              mb: 5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AppLogo />
          </Box>
        </Box>
        <SigninJwtAuth />
        {/* <SigninFirebase /> */}
      </Box>
    </AuthWrapper>
  );
};

export default Signin;
