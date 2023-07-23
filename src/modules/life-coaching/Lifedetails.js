import Coachingdetail from 'modules/commanmodules/Coachingdetail';
import React from 'react';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export default function Lifedetails() {
    var DetailObject = [
        {
            heading: 'Encouraging You To Achieve Your Goals.',
            para:

                <span>
                    If you want to achieve your goals & turn your dreams into reality
                    then life coaching is for you. Coaching works like magic in your
                    life. Your coach will guide you according to your dreams. Your focus
                    will be creating the success you have dreamt of. He will ask you the
                    right set of questions in the right procedure to help you outcome
                    with the actions you can implement. Coach will not provide you the
                    solution but he will let the solution come from you as the solution
                    lies within you. Coaching will lead you to think differently.
                    <br></br>
                    <br></br>Everyone is unique & has different abilities that will help
                    you to realize your full potential. Your self-awareness will
                    increase & help you to mark the difficulties & barriers you
                    experience. A coach is not an expert but he enables a individual to
                    take the actions in the right direction for achieving goals.
                    Coaching is an inward driven process. It does not focus on external
                    challenges instead focuses on the individuals capability to change
                    the situation. Your coach will help you to build a road which will
                    take you to your destination boosting your happiness & success.
                </span>

        },
        {
            heading: "Benefits of Life Coaching",
            para: <span>

                <List>
                    <ListItem>
                        <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                        <ListItemText primary=' Identifying aims and objectives.' />
                    </ListItem>
                    <ListItem>
                        <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                        <ListItemText primary='Creating executive and distinctive extension plan'></ListItemText></ListItem>
                    <ListItem>
                        <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                        <ListItemText primary='Recognizing faith & confidence'></ListItemText></ListItem>
                    <ListItem>
                        <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                        <ListItemText primary='Functioning with regard to monetory freedom'></ListItemText></ListItem>

                    <ListItem>

                        <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                        <ListItemText primary='Acquiring job/living stability'></ListItemText></ListItem>
                    <ListItem>
                        <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                        <ListItemText primary='Learning to communicate further more concisely and productively'></ListItemText></ListItem>
                    <ListItem>
                        <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                        <ListItemText primary='Promoting more stronger relationships professionally & personally'></ListItemText></ListItem>
                </List>

            </span>
        }

    ]

    return (
        <div>
            <Coachingdetail DetailObject={DetailObject} />
        </div>
    );
}
