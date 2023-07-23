import React from 'react'
import { Container, Typography } from '@mui/material'
import { AppCard } from '@crema'

export default function Coachingdetail(props) {
    return (
        <div>


            <AppCard sx={{ mb: 7 }}>
                {props.DetailObject.map((item, i) => (
                    <div key={i}>
                        <Typography variant='h1' sx={{ color: "#20509e", textAlign: "center", mt: 3 }} gutterBottom>{item.heading}</Typography>
                        <Typography variant='body2'>{item.para}</Typography>

                    </div>
                ))}
            </AppCard>

        </div>
    )
}
