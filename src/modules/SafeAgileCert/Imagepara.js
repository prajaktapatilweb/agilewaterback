import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Herosection from 'modules/commanmodules/Herosection';

export default function Imagepara() {
  return (
    <div>
      <Herosection
        image1='/assets/images/courselogo/SAFe-Agilist-Logo.png'
        // /assets/images/Safe/SAFe-Agilist-Logo.png'
        heading=' Leading SAFe® 6.0 / SAFe® 6.0 Agilist Certification'
        list1={[
          '2 Days of Classroom Training',
          '  100% Assured Results',
          'Trained by experienced SPC 5.0 SAFe Consultant',
          '  1 year membership to the SAFe Community Platform',
          'Insightful Study Material'
        ]}
      />
    </div>
  );
}
