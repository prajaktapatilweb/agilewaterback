import React from 'react';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';

export default function Courseinfo(props) {
    return (
        <>
            <Box>
                {props.DetailObject.map((item, i) => (
                    <h5>
                        <Typography variant='h2' sx={{ color: "#20509e" }} key={i} gutterBottom>
                            {item.subtitle}
                        </Typography>
                        <Typography variant='body1' gutterBottom>{item.para}</Typography>
                        {/* <List>

                            <ListItem>
                                <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                                <ListItemText
                                    primary={item.list1}
                                    primaryTypographyProps={{ fontSize: '18px' }}
                                />
                            </ListItem>

                        </List> */}
                    </h5>
                ))}
            </Box>
        </>
    );
}
