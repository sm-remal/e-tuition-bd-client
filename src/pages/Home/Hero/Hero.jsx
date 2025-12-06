import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Hero = () => {
    const slides = [
        {
            id: 1,
            title: "Find the Best Tutors Easily",
            subtitle: "Browse verified tutors and connect instantly.",
            img: "https://i.ibb.co/8bFB9db/slider1.jpg",
        },
        {
            id: 2,
            title: "Post Your Tuition Requirements",
            subtitle: "Students can post tuition and get tutor applications.",
            img: "https://i.ibb.co/nQfSqPg/slider2.jpg",
        },
        {
            id: 3,
            title: "Smart Tuition Management",
            subtitle: "Track applications, payments, and ongoing tuitions.",
            img: "https://i.ibb.co/1vf25QK/slider3.jpg",
        },
    ];

    return (
        <div className="w-full h-[450px] overflow-hidden">
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper w-full h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-[80vh]">
                            {/* Background Image */}
                            <img
                                src={slide.img}
                                alt="slide"
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                            {/* Text Content */}
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
                                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-xl mb-6">
                                    {slide.subtitle}
                                </p>

                                <button className="btn btn-primary px-8">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Hero;
