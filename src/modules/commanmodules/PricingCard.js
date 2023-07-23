import React from 'react'
import AppCard from '@crema/core/AppCard';
import { Box } from '@mui/material'
import { Typography } from '@mui/material';
import Image from 'next/image';


export default function PricingCard(props) {
    return (
        <div>

            <AppCard>
                <Typography variant='h2' sx={{ color: "#20509e" }} gutterBottom>
                    {props.heading}
                </Typography>
                <Box>
                    <Image
                        src={props.img}
                        width={200}
                        height={80}
                        layout="responsive"
                        alt=""
                    />


                </Box>
            </AppCard>
        </div>
    )
}
