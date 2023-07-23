import React from 'react'
import { Container, Typography, Box } from '@mui/material'
import ScrumcoachHeader from './ScrumcoachHeader'
import ScrumcoachDetails from './ScrumcoachDetails'

export default function index() {
    return (
        <div>
            <ScrumcoachHeader />
            <Container sx={{ maxWidth: { xl: 1450 }, marginTop: 10 }}>
                <ScrumcoachDetails />
            </Container>
        </div>
    )
}
