import React from 'react'
import { Box, Card, CardContent, Container, Typography, Grid } from '@mui/material'

export default function Coachingheader(props) {

    return (
        <div>
            <Grid container className='section' style={{ background: '#edeff3' }}>
                <Container sx={{ maxWidth: { xl: 1400 }, textAlign: 'center', marginTop: 6 }}>
                    <Box>
                        {/* <Card variant='outlined'> */}
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} textAlign="center" color='text.secondary' gutterBottom>
                                <Typography variant='h6'>{props.title} </Typography>
                                <Typography variant='hed'>{props.subtitle}</Typography>
                                <br></br><br></br>
                                <p>{props.para}</p>
                            </Typography>

                        </CardContent>
                        {/* </Card> */}
                    </Box>
                </Container>
            </Grid>
        </div>
    )
}
