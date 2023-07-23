import React from 'react'
import { Container, Typography, Box } from '@mui/material'
import AgileHeader from './AgileHeader'
import Agiledetails from './Agiledetails'
import CoachProfile from 'modules/commanmodules/CoachProfile'
import { usersList } from 'modules/Constant/Coachdata'

export default function index() {

    return (
        <div>
            <AgileHeader />
            <Container sx={{ maxWidth: { xl: 1450 }, marginTop: 10 }}>
                <Agiledetails />
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant='h7'>Choose From Our Top Agile Coaches</Typography>
                </Box>
                <CoachProfile data={usersList} />
            </Container>

        </div>
    )
}
