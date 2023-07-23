import React from 'react';
import AppCard from '@crema/core/AppCard';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Fonts } from 'shared/constants/AppEnums';
import { Container } from '@mui/material';

const Testcard = (props) => {
    return (

        <AppCard sxStyle={{ height: 1, backgroundColor: '#0A8FDC', marginTop: 5 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 1,

                }}
            >
                <Box
                    sx={{
                        mb: 2,
                    }}
                >
                    {props.img}
                    {/* <img src={'/assets/images/dashboard/academy/promo.png'} alt='promo' /> */}
                </Box>
                <Box
                    component='p'
                    sx={{
                        mb: 2,
                        fontSize: 14,
                        fontWeight: Fonts.MEDIUM,
                        color: '#fff',
                    }}
                >
                    {props.testpara}
                </Box>
                {/* <Box
                        component='p'
                        sx={{
                            mb: 3,
                            color: '#fff',
                        }}
                    >

                    </Box> */}
                <Box>
                    <Button
                        variant='contained'
                        size='small'
                        sx={{
                            backgroundColor: '#fff',
                            color: '#000',
                            textTransform: 'capitalize',
                            '&:hover, &:focus': {
                                backgroundColor: '#fff',
                                color: '#000',
                            },
                        }}
                    >
                        {props.testbutton}
                    </Button>
                </Box>
            </Box>
        </AppCard>

    );
};

export default Testcard;
