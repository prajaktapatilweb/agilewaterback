import React from 'react';
import { List, ListItemText, ListItem } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Courseinfo from 'modules/commanmodules/Courseinfo';

export default function Safeinfo() {
    var DetailObject = [
        {
            subtitle: <span>SAFe Agilist Certification Training Overview : </span>,
            para: (
                <span>
                    If you have the talent to implement Agile Methods effectively and you
                    also have the ability within yourself to become Agile, then SAFe
                    Agilist Certification is the one you should go for. SAFe Agilist
                    Certification gives you authentication to Practice the Fundamentals of
                    SAFe and its principles, to attain Business Agility for the
                    organisation while making the workflow process Agile.
                </span>
            ),

        },
        {
            subtitle:
                'Benefits of Getting Certified with the SAFe Agilist Certification :',
            para: 'Configure a collaborative approach to stay ahead of the market competition. Expand wide Career Opportunities across Various Sections of the Software & IT industry. Optimise methods for Product & Portfolio success. Explore Agile Techniques for continuous improvement. Engage incremental growth values for stakeholders and end-users. Learn best industry techniques and methods to do SAFe Agilist roles efficiently.',

        },
        {
            subtitle: 'Requirements :',
            para: 'Attend SAFe Training Course by our expert and hands-on SAFe Trainer. After completion of the Course, clear the Certification Exam. Upon passing the Certification Exam, accept your SAFe License Agreement and complete your SAFe membership Profile.',

        },
        {
            subtitle: 'How Agilewaters helps you :',
            para: (
                <List>
                    <ListItem>
                        <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                        <ListItemText primary=' Free Mock Test' />
                    </ListItem>
                    <ListItem>
                        <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                        <ListItemText primary=' Free Consulting' />
                    </ListItem>
                    <ListItem>
                        <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                        <ListItemText primary='Free Certified Courses' />
                    </ListItem>
                    <ListItem>
                        <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                        <ListItemText primary='Free Guidance' />
                    </ListItem>
                </List>
            ),

        },

        // {
        //     subtitle: 'How Agilewaters helps you :',
        //     para: 'gdfg',
        //     list1: [
        //         '2 Days of Classroom Training',
        //         '  100% Assured Results',
        //         'Trained by experienced SPC 5.0 SAFe Consultant',
        //         '  1 year membership to the SAFe Community Platform',
        //         'Insightful Study Material'
        //     ]
        // }
    ];
    return (
        <div>
            <Courseinfo DetailObject={DetailObject} />
        </div>
    );
}
