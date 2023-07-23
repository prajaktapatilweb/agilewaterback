import React from 'react';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Fonts } from 'shared/constants/AppEnums';
import PropTypes from 'prop-types';
import Image from 'next/image';

const CourseItem = ({ data }) => {
  return (
    <Box
      sx={{
        px: { sm: 3 },
        textAlign: 'center'
      }}
    >
      <Box
        sx={{
          mb: 2,
        }}
      >
        <Image
          src={data.image}
          alt={data.title}
          width={100}
          height={100}
          layout='responsive'
        />

        {/* <img src={data.image} alt={data.title} /> */}
      </Box>
      <Box
        component='p'
        sx={{
          fontSize: 14,
          fontWeight: Fonts.MEDIUM,
          alignItems: 'center',
          justifyContent: 'center',

          mb: 2,
        }}
      >
        {data.title}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.secondary',

        }}
      >
        {/* <Box component='p' sx={{ textAlign: 'center' }}>{data.author}</Box> */}
        <Box
          sx={{
            ml: 3,
            display: 'flex',
            alignItems: 'center',
            '& .MuiSvgIcon-root': {
              fontSize: 16,
            },
          }}
        >
          <VisibilityIcon />
          <Box
            component='p'
            sx={{
              ml: 2,

            }}
          >
            {data.views} views
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseItem;

CourseItem.propTypes = {
  data: PropTypes.object,
};
