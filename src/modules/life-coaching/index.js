import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import LifeHeader from './LifeHeader';
import Lifedetails from './Lifedetails';
import CoachProfile from 'modules/commanmodules/CoachProfile';
import { usersList1 } from 'modules/Constant/Coachdata';
import Democoach from 'modules/commanmodules/Democoach';

export default function LifeCoching() {
    // console.log('dddd', usersList1);

    return (
        <div>
            <LifeHeader />
            <Container sx={{ maxWidth: { xl: 1450 }, marginTop: 10 }}>
                <Lifedetails />
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant='h7'>Choose From Our Top Life Coaches</Typography>
                </Box>
                <CoachProfile data={usersList1} />
            </Container>

            {/* <Democoach /> */}
        </div>
    );
}
