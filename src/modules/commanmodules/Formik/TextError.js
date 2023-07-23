import React from 'react';
import {Box} from '@mui/material';
import PropTypes from 'prop-types';

const TextError = (props) => {
  return <Box sx={{color: '#d32f2f '}}>{props.children}</Box>;
};
export default TextError;

TextError.propTypes = {
  children: PropTypes.object.isRequired,
};
