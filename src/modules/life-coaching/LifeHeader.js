import Coachingheader from 'modules/commanmodules/Coachingheader'
import React from 'react'
import { Button } from '@mui/material'

export default function LifeHeader() {
    return (
        <div>
            <Coachingheader
                title="LIFE COACHING"
                subtitle="Be Who You Want To Be"
                para={<Button variant="contained" sx={{ backgroundImage: "linear-gradient(to right, #3e2bce 0%, #2dd3aa 100%, #2dd3aa 100%, #2dd3aa 100%)" }}> Hire An Agile Coach</Button>}

            />
        </div>
    )
}
