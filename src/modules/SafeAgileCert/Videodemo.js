import React, { useState } from 'react';
import AppCard from '@crema/core/AppCard';
import Card from '@mui/material';
import Box from '@mui/material/Box';
import ReactPlayer from 'react-player';
import { Container } from '@mui/material';

export default function Videodemo() {
    return (
        <div>


            <Box
                sx={{
                    background: "white",
                    borderRadius: "7px",
                    padding: 2,
                    boxShadow: "1px 5px 8px 5px #d4d4d4",

                    '& .react-player': {
                        width: '100% !important',
                    },
                }}
            >
                <ReactPlayer
                    className='react-player'
                    controls={true}
                    url='https://www.youtube.com/watch?v=-M-R3Lc-V74'
                />
            </Box>


        </div>
    );
}
