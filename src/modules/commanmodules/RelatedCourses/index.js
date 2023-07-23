import React from 'react';
import AppCard from '@crema/core/AppCard';
import { useIntl } from 'react-intl';
import Slider from 'react-slick';
import CourseItem from './CourseItem';
import PropTypes from 'prop-types';
import CourseSlider from './CourseSlider';
import Image from 'next/image';
import { courseList2 } from 'modules/Constant/Relatecoursedata';

const RelatedCourses = () => {
  // var relatedCourses1 = [
  //   {
  //     image: '/assets/images/safe/ICP-ACC.webp',
  //     title: 'Agile Coaching',
  //     views: '1.8k',
  //   },
  //   {
  //     image: '/assets/images/safe/ScrumAtScale-Badge-Practitioner.png',
  //     title: 'Scrum@Scale Practitioner',
  //     views: '1.5k',
  //   },
  //   {
  //     image: '/assets/images/safe/CSM-Logo.webp',
  //     title: 'Scrum Master',
  //     views: '1.2k',
  //   },
  // ];
  const { messages } = useIntl();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,

        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    // <Container sx={{ maxWidth: { xl: 1400 } }}>
    <AppCard sxStyle={{ marginTop: 5, marginBottom: 5 }} title={'Related Courses'}>
      {/* <AppCard sxStyle={{ height: 1 }} title={messages['academy.relatedCourses']}> */}

      <CourseSlider>
        <Slider className='slideRoot' {...settings}>
          {courseList2.map((data, index) => (
            <CourseItem key={index} data={data} />
          ))}
        </Slider>
      </CourseSlider>
    </AppCard>
    // </Container>
  );
};

export default RelatedCourses;

RelatedCourses.propTypes = {
  relatedCourses1: PropTypes.array,
};
