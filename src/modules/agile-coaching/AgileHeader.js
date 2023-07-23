import { Button } from '@mui/material'
import Coachingheader from 'modules/commanmodules/Coachingheader'
import React from 'react'

export default function AgileHeader() {
    return (
        <div>

            <Coachingheader
                title="AGILE COACHING"
                subtitle="Intelligence Is The Ability To Adapt To Change"
                para={<Button variant="contained" sx={{ backgroundImage: "linear-gradient(to right, #3e2bce 0%, #2dd3aa 100%, #2dd3aa 100%, #2dd3aa 100%)" }}> Hire An Agile Coach</Button>}


            />
        </div>
    )
}
