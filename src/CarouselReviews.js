import React from "react";
import Slider from "react-slick";
import UserReviews from './UserReviews.js'

import { Link } from 'react-router-dom';

// this component handles the user review carousel of about us page
export default function CarouselReviews() {
  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <Slider {...settings} className="carouselReviewContainer">
      <Link to={'/'} className="plainLink">
        <UserReviews startIndex={0}></UserReviews>
      </Link>
      <Link to={'/'} className="plainLink">
        <UserReviews startIndex={3}></UserReviews>
      </Link>
    </Slider>
  );
}