import React from 'react'
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import IconButton from '@mui/material/IconButton';
import { contactno1, contactno2, emailid1 } from 'modules/Constant/CallBackConst';
import Link from "next/link";

export default function CallBack() {
    return (
        <>
            <IconButton> <CallTwoToneIcon /></IconButton>
            <Link href={`tel:${contactno1}`} target="_blank" >
                <a className="nav-link-inner--text text-yellow">
                    {contactno1}
                </a>
            </Link> /
            <Link href={`tel:${contactno1}`} target="_blank" >
                <a className="nav-link-inner--text text-yellow">
                    {contactno2}
                </a>
            </Link>
            <IconButton><EmailTwoToneIcon /> </IconButton>
            <Link href={`mailto:${emailid1}`} target="_blank">
                <a className="nav-link-inner--text text-yellow">
                    {emailid1}
                </a>

            </Link>
        </>
    )
}
