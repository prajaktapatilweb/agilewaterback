import React from 'react';
import { makeStyles } from '@mui/material';
import { Grid, Typography, Container } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Image from 'next/dist/client/image';
// import Grid from '@material-ui/core/Grid';




export default function Gridcheck() {
    return (
        <div>

            <Grid container spacing={3} >
                <Grid item xs={12} sm={6}>
                    <div >

                        {/* <Typography variant="h5" component="h3" >
                            Explore Tokyo
                        </Typography>
                        <Typography >
                            Discover Tokyo like you never have before.
                        </Typography> */}

                        <Image
                            src={'/assets/images/AboutUs.png'}
                            alt='about us'
                            title='aboutUs'
                            width='100%'
                            height="100%"


                        />

                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div>

                        <Typography variant="h5" component="h3" >
                            Eat Delicious Food
                        </Typography>
                        <Typography >
                            Find the best local restaurants and bars.

                        </Typography>
                        <List sx={{ bgcolor: 'background.paper' }}>
                            <ListItem>
                                <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                                <ListItemText primary=' 2 Days of Classroom Training' />
                            </ListItem>
                            <ListItem>
                                <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                                <ListItemText primary='  100% Assured Results' />
                            </ListItem>
                            <ListItem>
                                <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                                <ListItemText primary='Trained by experienced SPC 5.0 SAFe Consultant' />
                            </ListItem>
                            <ListItem>
                                <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                                <ListItemText primary='  1 year membership to the SAFe Community Platform' />
                            </ListItem>
                        </List>
                    </div>
                </Grid>
                {/* <Grid item xs={12} sm={4}>
                    <div >

                        <Typography variant="h5" component="h3" >
                            Visit the Best Spots
                        </Typography>
                        <Typography >
                            Check out some of the less known locations and attractions for tourists.
                        </Typography>
                    </div>
                </Grid> */}
            </Grid>

        </div>
    )
}
