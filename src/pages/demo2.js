import React from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import zIndex from '@mui/material/styles/zIndex';
import { Fonts } from 'shared/constants/AppEnums';

const ListItem1 = ({ user }) => {
    return (
        <Card
            className='cards'
            sx={{
                width: '100%',
            }}
        >
            <div className='lines'></div>
            {user && (
                <Box sx={{ width: '100%', p: 3 }}>
                    <Box
                        sx={{
                            color: 'primary.contrastText',
                            // width: { xs: '100%', sm: 200, xl: 200 },
                            // p: { xs: 3, lg: 3 },

                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Avatar
                            src={user.img}
                            sx={{
                                height: 85,
                                width: 85,
                                // height: 100,
                                // width: 100,
                            }}
                        />
                        <Button
                            variant='contained'
                            sx={{
                                backgroundColor: (theme) => theme.palette.primary.contrastText,
                                color: 'grey.500',
                                marginTop: 2,
                                border: '1px solid',
                                borderColor: 'grey.500',
                                width: 96,
                                fontWeight: Fonts.MEDIUM,
                                padding: '9px 12px',
                                lineHeight: 1,
                            }}
                        >
                            Contact
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: 'white',
                                p: 3,
                                zIndex: 1,
                            }}
                        >
                            <Box
                                variant='h1'
                                sx={{
                                    px: 3,
                                    zIndex: 1,
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    color: '#20509e',
                                    backgroundColor: 'white',
                                    fontWeight: Fonts.BOLD,
                                }}
                            >
                                {user.name}
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        float: 'right',
                                        zIndex: 1,
                                    }}
                                >
                                    <LocationOnTwoToneIcon></LocationOnTwoToneIcon>
                                    {user.location}
                                </Box>
                                <Box
                                    sx={{
                                        color: 'grey.700',
                                    }}
                                >
                                    {user.expertise}
                                    <br /> <b>Experience : </b>
                                    {user.experience}
                                </Box>
                                <Box
                                    sx={{
                                        color: '#e31a15',
                                        // mx: { xs: -1, xl: -2 },
                                    }}
                                >
                                    Coach Specializations :
                                </Box>
                                <Box
                                    sx={{
                                        color: 'grey.700',
                                    }}
                                >
                                    <span>
                                        <List>
                                            {user.specifications.map((item, i) => (
                                                <ListItem
                                                    sx={{
                                                        m: 0,
                                                        padding: 0,
                                                    }}
                                                    key={i}
                                                >
                                                    <StarIcon fontSize='1px' sx={{ mr: 2 }}></StarIcon>
                                                    <ListItemText primary={item} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </span>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </Card>
    );
};

export default ListItem1;

ListItem1.propTypes = {
    user: PropTypes.object.isRequired,
};
