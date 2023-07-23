import {Container, Link} from '@mui/material';
import React from 'react';
import {Grid} from '@mui/material';
import {Typography, Box} from '@mui/material';
import Image from 'next/image';
import {Button} from '@mui/material';
import AppGridContainer from '@crema/core/AppGridContainer';

export default function Userfooter() {
  return (
    <div>
      <Grid container className='section' style={{background: '#ffffff'}}>
        {/* backgroundImage: "linear-gradient(180deg,#9c27b0,#540162 )" */}
        <Container sx={{maxWidth: {xl: 1450}}}>
          <AppGridContainer>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{color: 'white'}}
              ml={{xs: 10, sm: 0}}
            >
              <Link
                href='/safepages/safe-agile-certification'
                sx={{color: '#00a1ff', textDecoration: 'none'}}
              >
                Scrum@Scale Practitioner
              </Link>
              <br></br>
              <Link
                href='/safepages/safe-agile-certification'
                sx={{color: '#00a1ff', textDecoration: 'none'}}
              >
                CSM – Certified Scrum Master
              </Link>
              <br></br>
              <Link
                href='/safepages/safe-agile-certification'
                sx={{color: '#00a1ff', textDecoration: 'none'}}
              >
                SAFe Agile Certification
              </Link>
              <br></br>
              <Link
                href='/safepages/safe-agile-certification'
                sx={{color: '#00a1ff', textDecoration: 'none'}}
              >
                SAFe Scrum Master
              </Link>
              <br></br>
              <Link
                href='/safepages/safe-agile-certification'
                sx={{color: '#00a1ff', textDecoration: 'none'}}
              >
                Scrum Product Owner
              </Link>
              <br></br>
              <Link
                href='/safepages/safe-agile-certification'
                sx={{color: '#00a1ff', textDecoration: 'none'}}
              >
                DevOps Professional
              </Link>
              <br></br>
              <Link
                href='/safepages/safe-agile-certification'
                sx={{color: '#00a1ff', textDecoration: 'none'}}
              >
                DevOps Master
              </Link>
              <br></br>
              <Link
                href='/safepages/safe-agile-certification'
                sx={{color: '#00a1ff', textDecoration: 'none'}}
              >
                PMI – ACP
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              mb={{xs: 5, sm: 5, md: 0}}
              ml={{xs: 10, sm: 0}}
            >
              <Typography variant='h2' color='#20509e' gutterBottom>
                Corporate Office
              </Typography>
              <p style={{color: '#75849a'}}>
                Office No.111, Vision 9 Mall,<br></br>
                1st floor, Kunal Icon Rd,<br></br>
                Pimple Saudagar, Pune, Maharashtra<br></br>
                PIN : 411027
              </p>

              <Typography variant='h2' color='#20509e' gutterBottom>
                Other Offices
              </Typography>
              <p style={{color: '#75849a'}}>
                Bengaluru, Mumbai, Noida,<br></br>
                Hyderabad, Kolkata, Mexico, UK<br></br>
              </p>
              <br></br>
              <Button
                variant='contained'
                sx={{
                  backgroundImage:
                    'linear-gradient(to right, #3e2bce 0%, #2dd3aa 100%, #2dd3aa 100%, #2dd3aa 100%)',
                }}
              >
                Contact Us
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3} ml={{xs: 10, sm: 0}}>
              <Typography variant='h2' color='#20509e' gutterBottom>
                Reach Us
              </Typography>
              <p style={{color: '#75849a'}} gutterBottom>
                +91 9405045060<br></br>
                +91 9421809846<br></br>
                Support@AgileWaters.com<br></br>
                AgileWaters-Linktree
              </p>

              <Typography variant='h2' color='#20509e' gutterBottom>
                Other Links
              </Typography>
              <Link
                href='https://www.apgionline.com/'
                sx={{color: '#00a1ff', textDecoration: 'none'}}
              >
                {' '}
                APGI
              </Link>
              <br></br>
              <Link
                href='https://vijaywade.com/'
                sx={{color: '#00a1ff', textDecoration: 'none'}}
              >
                {' '}
                VijayWade
              </Link>
              <br></br>
            </Grid>
            <Grid item xs={12} sm={6} md={3} ml={{xs: 10, sm: 0}}>
              <Typography variant='h2' color='#20509e' gutterBottom>
                Legal
              </Typography>
              <p style={{color: '#75849a'}} gutterBottom>
                Privacy Policy<br></br>
                Refund Policy<br></br>
              </p>
              <Typography variant='h2' color='#20509e' gutterBottom>
                {' '}
                Membership:
              </Typography>
              <Image
                alt='Safelogo'
                src='/assets/images/safe/safe-Bronze-partnership-bagde-logo.webp'
                height='100%'
                width='100%'
              />
              <Image
                alt='Safelogo'
                src='/assets/images/safe/ICAgile-Logo.jpeg'
                height='100%'
                width='100%'
              />
              <br></br>
              <Box sx={{pl: 5, pt: 2}}>
                <Image
                  alt='Safelogo'
                  src='/assets/images/safe/EXIN-Logo-e1625802522731.webp'
                  height='30%'
                  width='60%'
                />
              </Box>
            </Grid>
          </AppGridContainer>
        </Container>

        <hr />
      </Grid>
    </div>
  );
}
