import { Button, Container } from '@mui/material';
import Coachingdetail from 'modules/commanmodules/Coachingdetail';
import React from 'react';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

export default function ScrumcoachDetails() {
    const ColorButton = styled(Button)(({ theme }) => ({
        fontSize: 20,
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    }));



    var DetailObject = [
        {
            heading: (
                <span>
                    {' '}

                </span>
            ),
            para: (
                <span>
                    Whether you're just out of college and trying to figure out what you
                    want to do with the rest of your 20s and beyond, or you've discovered
                    that the life you've been living isn't serving you anymore.
                    <br></br> <br></br>Finding the proper path in life is something you
                    must do, not something that happens to you.We all have individual
                    strengths, and we all have a set of essential values that influence
                    how we conduct our lives. We will be happy if we live our lives in
                    accordance with our core principles. We won't necessarily make the
                    finest decisions about our life's trajectory if we aren't aware of
                    what these ideals are.
                    <br></br> <br></br>The question of whether or not we should trust our
                    instincts is a recurring one, yet we must learn to trust our guts at
                    some point.Start doing some self-research if you realise your current
                    life path isn't serving your needs, but you're not sure what would.We
                    all have individual strengths, but it can be difficult to recognise
                    them.
                    <br></br> <br></br>How well you prepare for a job interview will
                    determine how successful you are. Researching the job and the firm, as
                    well as attentively analysing your replies to the interview questions,
                    are the most important aspects of interview preparation. There are
                    several components of the interview that you should prepare for during
                    and after the interview, in addition to pre-interview preparation. Get
                    to know the procedures involved in preparing for a job interview, as
                    well as some practical advice on how to enhance your chances of
                    securing a job.
                </span>
            ),
        },
    ];

    return (
        <div>
            <Container sx={{ maxWidth: { xl: 1400 }, marginTop: 10, textAlign: "center" }}>
                <ColorButton variant='contained' sx={{ m: 5 }}>Be Honest</ColorButton>
                <ColorButton variant='contained' sx={{ m: 5 }}>Be Confident</ColorButton>
                <ColorButton variant='contained' sx={{ m: 5 }}>Be Yourself</ColorButton>

            </Container>
            <Coachingdetail DetailObject={DetailObject}></Coachingdetail>
        </div>
    );
}
