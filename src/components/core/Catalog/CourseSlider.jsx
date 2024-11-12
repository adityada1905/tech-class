import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { FreeMode, Pagination, Autoplay, Navigation } from 'swiper/modules';

import CourseCard from './Course_Card';

const CourseSlider = ({ Courses }) => {

  const courseArray = Array.isArray(Courses) ? Courses : [];
  console.log("Courses Array:", courseArray);
  return (
    <>
      {courseArray.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination, Autoplay, Navigation]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          freeMode={true}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]"
        >
          {courseArray.map((course, i) => (
            <SwiperSlide key={i}>
              <CourseCard course={course} Height="h-[250px]" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5"></p>
      )}
    </>
  );
};

export default CourseSlider;
