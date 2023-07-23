import React from 'react';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import {Box, alpha, Container, Hidden} from '@mui/material';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import {useSidebarContext} from '../../../../utility/AppContextProvider/SidebarContextProvider';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Grid from '@mui/material';
import CallBack from 'modules/commanmodules/CallBack';

const NotificationBar = () => {
  const [open, setOpen] = React.useState(true);
  const {sidebarBgColor, sidebarTextColor} = useSidebarContext();
  const [scrollDirection, setScrollDirection] = React.useState(null);
  React.useEffect(() => {
    let lastScrollY = window.scrollY;
    console.log('ffff', window.scrollY, lastScrollY, scrollDirection);

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 ? setOpen(false) : null,
        scrollY - lastScrollY < -10 ? setOpen(true) : null);
      // setScrollDirection(direction);

      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener('scroll', updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener('scroll', updateScrollDirection); // clean up
    };
  }, [scrollDirection]);
  return (
    <Collapse in={open}>
      <Box
        sx={{
          borderBottom: (theme) =>
            `solid 1px ${alpha(theme.palette.common.black, 0.15)}`,
          padding: '2px 0',
          backgroundColor: sidebarBgColor,
          color: sidebarTextColor,
        }}
      >
        <Container
          sx={{
            maxWidth: {xl: 1400},
            textAlign: {
              xs: 'center',
              sm: 'left',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              '@media (min-width: 768px)': {
                flexDirection: 'row',
              },
            }}
          >
            <Hidden mdDown>
              <Box
                sx={{
                  width: '100%',
                  maxHeight: 300,
                  '@media (min-width: 768px)': {
                    width: '50%',
                  },
                }}
              >
                <CallBack />
              </Box>
            </Hidden>
            <Box
              sx={{
                width: '100%',
                textAlign: {
                  xs: 'center',
                  sm: 'center',
                  md: 'right',
                },
                // textAlign: 'right',
                '@media (min-width: 768px)': {
                  width: '50%',
                },
              }}
            >
              {/* <Alert
            sx={{
              backgroundColor: 'transparent !important',
              padding: 0,
              textAlign: 'center',
              color: 'inherit',
              '& .MuiAlert-message': {
                flex: 1,
              },
              '& .MuiAlert-action': {
                ml: 2.5,
              },
            }}
            icon={false}
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
          >

          </Alert> */}
              <IconButton>
                {' '}
                <a
                  href='https://www.facebook.com/AgileWatersConsulting/'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FacebookIcon sx={{color: '#1b4e9b'}} />{' '}
                </a>
              </IconButton>
              <IconButton>
                <a
                  href='https://twitter.com/AgilewatersCo'
                  target='_blank'
                  rel='noreferrer'
                >
                  <TwitterIcon sx={{color: '#00aeef'}}></TwitterIcon>
                </a>
              </IconButton>
              <IconButton>
                <a
                  href='https://www.instagram.com/agilewatersconsulting/'
                  target='_blank'
                  rel='noreferrer'
                >
                  <InstagramIcon sx={{color: '#f26f37'}}></InstagramIcon>
                </a>
              </IconButton>
              <IconButton>
                <a
                  href='https://www.linkedin.com/company/agilewaters-consulting/'
                  target='_blank'
                  rel='noreferrer'
                >
                  <LinkedInIcon sx={{color: '#0277bd'}}> </LinkedInIcon>
                </a>
              </IconButton>
              <IconButton>
                <a
                  href='https://www.youtube.com/channel/UCaHUj0eP9LiEK5zL7QrNbNw'
                  target='_blank'
                  rel='noreferrer'
                >
                  <YouTubeIcon sx={{color: '#d50000'}}></YouTubeIcon>
                </a>
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>
    </Collapse>
  );
};

export default NotificationBar;
