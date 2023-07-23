import React from 'react';
import { AppCard } from '@crema';
import { Card } from '@mui/material';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import MediaSlider from './MediaSlider';
import Image from 'next/image';

const settings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SlideBasicArrow = ({ }) => {
  const slideBasicArrow = [
    {

      image: '/assets/images/safeslide/KMP2-scaled.jpg',
      title: 'KMP2-scaled'

    },
    {

      image: '/assets/images/safeslide/KMP2-scaled.jpg',
      title: 'ghjgfghkj'
    },
    {

      image: '/assets/images/safeslide/KMP2-scaled.jpg',
      title: 'ghjgfghkj'
    },
  ]
  return (
    <Card sx={{ padding: 3 }}>
      <MediaSlider>
        <Slider {...settings}>
          {slideBasicArrow.map((slide, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                maxHeight: { xs: 260, md: 350 },
                minHeight: { xs: 250, md: 330 },

              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',

                  '& img': {
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'cover',
                    height: '100%',
                    width: '100%',
                  },
                }}
              >
                <Image src={slide.image} height={100} width={100} layout='responsive' alt={slide.title} />
              </Box>
            </Box>
          ))}
        </Slider>
      </MediaSlider>
    </Card>
  );
};

export default SlideBasicArrow;

SlideBasicArrow.propTypes = {
  slideBasicArrow: PropTypes.array,
};
