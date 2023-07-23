import React from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import Button from '@mui/material/Button';
import { Fonts } from 'shared/constants/AppEnums';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import SendIcon from '@mui/icons-material/Send';


const ListItem1 = ({ user }) => {
  return (
    <Card sx={{ width: '100%' }} className='cards'>
      <div className='lines'></div>
      {user && (<Box

        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column' },
          justifyContent: 'space-between',
          width: '100%'
        }}
      >

        <Box
          sx={{
            color: 'primary.contrastText',
            p: 5,
            bgcolor: '#847266',
            m: 1,
            borderTopLeftRadius: 3,


            background: 'linear-gradient(to right, #3e2bce 0%, #2dd3aa 100%, #2dd3aa 100%, #2dd3aa 100%)',
            // bgcolor: 'primary.main',
            flexDirection: { xs: 'column', sm: 'column' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <div className='imgbox'>
            <div className='content'>
              <Avatar
                src={user.img}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  transition: 0.5,

                }}
              />
            </div>
          </div>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 5

            }}
          >
            <Button variant="contained" endIcon={<SendIcon />} sx={{ background: 'white', color: '#2050ab' }}>
              Contact
            </Button>
          </Box>
        </Box>

        <Box sx={{ p: 4 }}>
          <Box sx={{ color: 'grey.600' }}>
            <Box
              sx={{
                mx: -3,
                mb: 2,
                color: 'text.primary',
                display: 'flex',
                fontSize: { xs: 14, xl: 16 },
                // flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <Box
                variant='h1'
                sx={{
                  px: 3,
                  display: 'flex',
                  cursor: 'pointer',
                  color: '#20509e',
                  fontWeight: Fonts.BOLD,
                  zIndex: 1,
                }}
              >
                {user.name}

              </Box>

              <Box
                sx={{
                  px: 3,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 1,
                }}
              >
                <LocationOnTwoToneIcon></LocationOnTwoToneIcon>
                {/* <LanguageIcon /> */}

                {user.location}

              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                color: 'grey.700',
                mb: 4,
                zIndex: 1,
                // fontSize: 14,
                // fontWeight: Fonts.LIGHT,
              }}
            >
              {user.expertise}
              <br /> <b>Experience : </b>
              {user.experience}
              {/* {user.info1} */}
            </Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{
              color: '#e31a15',
              zIndex: 1,
            }}
            >
              Coach Specializations :
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                color: 'grey.700',
              }}
            >
              {/* {user.info2} */}
              <span>
                <List>
                  {user.specifications.map((item) => (
                    <ListItem
                      sx={{
                        m: 0,
                        padding: 0,
                      }}
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

      )}

    </Card>
  );
};

export default ListItem1;

ListItem1.propTypes = {
  user: PropTypes.object.isRequired,
};
