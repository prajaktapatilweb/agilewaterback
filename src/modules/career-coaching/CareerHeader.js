import Coachingheader from 'modules/commanmodules/Coachingheader'
import React from 'react'
import { Button } from '@mui/material'

export default function CareerHeader() {
    return (
        <div>
            <Coachingheader
                title="CAREER COACHING"
                subtitle="Opportunities Don't Happen You Create Them"
                para={<Button variant="contained" sx={{ backgroundImage: "linear-gradient(to right, #3e2bce 0%, #2dd3aa 100%, #2dd3aa 100%, #2dd3aa 100%)" }}> Hire An Agile Coach</Button>}

            />

        </div>
    )
}
