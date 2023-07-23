import React from 'react';
import { AppCard } from '@crema';
// import AppCard from '../../../../@crema/core/AppCard';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import SlideItem from './SlideItem';
import MediaSlider from './MediaSlider';

const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SlideBasicTwo = ({ }) => {
  var slideBasicTwo = [
    {

      image: '/assets/images/AboutUs.png',
      title: "Our strong development team will never ",
      description: '1.8k',
    },
    {

      image: '/assets/images/AboutUs.png',
      title: "Our strong development team will never ",
      description: 'gfdhgd',
    },
    {

      image: '/assets/images/AboutUs.png',
      title: "Our strong development team will never ",
      description: 'gfdhgd',
    },

  ]
  return (
    <AppCard>
      {/* <AppCard sxStyle={{ height: '100%' }}> */}
      <MediaSlider>
        <Slider {...settings}>
          {slideBasicTwo.map((slide, index) => (
            <SlideItem key={index} slide={slide} />
          ))}
        </Slider>
      </MediaSlider>
    </AppCard>
  );
};

export default SlideBasicTwo;

SlideBasicTwo.propTypes = {
  slideBasicTwo: PropTypes.array,
};
