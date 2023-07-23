import React from "react";
import { Container, Grid, Box } from "@mui/material";
import { Fonts } from "shared/constants/AppEnums";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export default function Herocontainer(props) {
    return (
        <>
            <Grid className="section section-lg section-shaped " style={{ backgroundImage: "linear-gradient(90deg, #05445e 35%, #189ab4 90%)", position: "relative" }}>
                <div className="shape shape-style-u1 shape-dark">
                    <span className="span-150" />
                    <span className="span-50" />
                    <span className="span-50" />
                    <span className="span-75" />
                    <span className="span-200" />
                    <span className="span-75" />
                    <span className="span-50" />
                    <span className="span-100" />
                    <span className="span-50" />
                    <span className="span-100" />
                </div>
                <Container>
                    <Grid container spacing={3} alignItems='center' sx={{ position: "relative", zIndex: 1 }}>
                        <Grid item xs={12} md={4}>
                            {props.img}
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={8}
                            alignItems='center'
                            justifyContent='center'
                        >
                            <Box
                                component='h1'
                                sx={{
                                    mb: 4,
                                    fontWeight: Fonts.BOLD,
                                    // fontSize: 16,
                                }}
                            >
                                {props.heading}
                            </Box>

                            <Box component='p' sx={{ mb: 5 }}>
                                {/* <List sx={{ bgcolor: 'background.paper' }}>
                                    {props.list1.map((item) => (
                                        <ListItem>
                                            <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                                            <ListItemText primary={item} />
                                        </ListItem>
                                    ))}
                                </List> */}
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
                {/* SVG separator */}
                <div className="separator separator-bottom separator-skew zindex-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon className="fill-white" points="2560 0 2560 100 0 100" />
                    </svg>
                </div>
            </Grid>
        </>
    );
}
