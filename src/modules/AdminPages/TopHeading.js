import React from 'react';
import {Box, Container} from '@mui/material';
import AppLogo from '../../@crema/core/AppLayout/components/AppLogo';
import PropTypes from 'prop-types';

function TopHeading({title}) {
  return (
    <Container display='flex' sx={{width: '100%'}}>
      <Box
        // m={1}
        alignItems='center'
        justifyContent='center'
        sx={{
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          // boxShadow: 1,
          // borderRadius: 2,
        }}
      >
        <AppLogo />
      </Box>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        sx={{
          bgcolor: 'primary.main',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          mb: 4,
          // minWidth: 300,
        }}
      >
        <h2>{title}</h2>{' '}
      </Box>
    </Container>
  );
}

export default TopHeading;

TopHeading.propTypes = {
  title: PropTypes.string.isRequired,
};
