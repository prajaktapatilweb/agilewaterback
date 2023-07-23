import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import SideBarContent from 'modules/AdminPages/SideBarContent';
import AppsContainer from '@crema/core/AppsContainer';
import AppScrollbar from '@crema/core/AppScrollbar';

export default function AuthLayout({children}) {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        position: 'relative',
        height: '100vh',
        backgroundColor: '#f3f4f6',
        backgroundSize: 'cover',

        '& .scrollbar-container': {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        },
        '& .main-content-view': {
          padding: 20,
        },
        '& .footer': {
          marginRight: 0,
          marginLeft: 0,
        },
      }}
    >
      <AppsContainer
        // title={'Admin User'}
        sidebarContent={<SideBarContent />}
      >
        <AppScrollbar className='scroll-app-sidebar'>{children}</AppScrollbar>
      </AppsContainer>
    </Box>
  );
}
AuthLayout.propTypes = {
  children: PropTypes.node,
};
