import React from 'react'
import Headersection from './Headersection';
import Standard from './Profile';
import { Typography } from '@mui/material';

export default function index() {
    return (
        <div>
            {/* <h1>hfjdgjkhfd</h1> */}
            <Headersection />
            <Typography variant='h1' gutterBottom>
                hello everyone

            </Typography>
            <Typography variant='subtitle1' gutterBottom>hfdjgdhfjggj gudfji u  igri jri</Typography>
            <Typography variant='subtitle2'>lorem gvghfj bfhjdf bjfdhfg hgjdgj</Typography>
            <Typography variant='body1'>
                Magna ipsum sunt voluptate quis labore laboris sit sunt magna sit nostrud aute. Est dolor nostrud eu laboris exercitation commodo. Non mollit exercitation ea quis magna nostrud Lorem deserunt culpa. Nisi aliquip cillum minim aute reprehenderit aliqua consectetur ex.
            </Typography>
            <Typography variant='body2'>
                Magna ipsum sunt voluptate quis labore laboris sit sunt magna sit nostrud aute. Est dolor nostrud eu laboris exercitation commodo. Non mollit exercitation ea quis magna nostrud Lorem deserunt culpa. Nisi aliquip cillum minim aute reprehenderit aliqua consectetur ex.
            </Typography>
            <Standard />
        </div>
    )
}

