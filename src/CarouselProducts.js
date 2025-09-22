import React from 'react';
import Slider from 'react-slick';

import { Link } from 'react-router-dom';

// this component handles the pictorial carousel of about us page
export default function CarouselProducts() {
    var settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const imgUrl1 = './images/carousel/slide1.JPG';
    const imgUrl2 = './images/carousel/slide2.JPG';
    const imgUrl3 = './images/carousel/slide3.JPG';
    const imgUrl4 = './images/carousel/slide4.JPG';

    return (
        <Slider {...settings} className="carouselContainer">
            <Link to={'/'}>
                <div
                    className="carouselSlide"
                    onClick={() => {
                        console.log('Carousel products slide 1 clicked');
                    }}
                >
                    <img src={imgUrl1}></img>
                    <div className="carouselText d-flex justify-content-center">
                        Welcome to LEEPS, your preferred place for limited edition fashion
                    </div>
                </div>
            </Link>

            <Link to={'/'}>
                <div
                    className="carouselSlide"
                    onClick={() => {
                        console.log('Carousel products slide 2 clicked');
                    }}
                >
                    <img src={imgUrl2}></img>
                    <div className="carouselText d-flex justify-content-center">
                        Efficient service and affortable fashion products all year round
                    </div>
                </div>
            </Link>

            <Link to={'/'}>
                <div
                    className="carouselSlide"
                    onClick={() => {
                        console.log('Carousel products slide 3 clicked');
                    }}
                >
                    <img src={imgUrl3}></img>
                    <div className="carouselText d-flex justify-content-center">
                        Get the limited edition items you desire without travelling overseas
                    </div>
                </div>
            </Link>

            <Link to={'/'}>
                <div
                    className="carouselSlide"
                    onClick={() => {
                        console.log('Carousel products slide 4 clicked');
                    }}
                >
                    <img src={imgUrl4}></img>
                    <div className="carouselText d-flex justify-content-center">
                        Popular brands from Japan and Korea available
                    </div>
                </div>
            </Link>
        </Slider>
    );
}
