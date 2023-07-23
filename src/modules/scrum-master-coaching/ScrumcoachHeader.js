import Coachingheader from 'modules/commanmodules/Coachingheader'
import React from 'react'
import { Button } from '@mui/material'


export default function ScrumcoachHeader() {
    return (
        <div>
            <Coachingheader
                title="SCRUM MASTER COACHING"
                subtitle="If it matters to you, you'll find a way"
                para={<Button variant="contained" sx={{ backgroundImage: "linear-gradient(to right, #3e2bce 0%, #2dd3aa 100%, #2dd3aa 100%, #2dd3aa 100%)" }}> Hire An Agile Coach</Button>}
            ></Coachingheader>
        </div>
    )
}
