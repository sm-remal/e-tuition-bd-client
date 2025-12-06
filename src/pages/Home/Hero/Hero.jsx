import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import banner1 from "../../../assets/Banner/banner1.png";
import banner2 from "../../../assets/Banner/banner2.png";
import banner3 from "../../../assets/Banner/banner3.png";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Hero = () => {
    const slides = [
        { id: 1, img: banner1 },
        { id: 2, img: banner2 },
        { id: 3, img: banner3 },
    ];

    return (
        <div className="w-full h-[35vh] md:h-[500px] rounded-xl overflow-hidden">
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
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
                        <div className="relative w-full h-[35vh] md:h-[500px]">
                            <img
                                src={slide.img}
                                alt="Banner"
                                className="w-full h-full object-cover"
                            />

                            {/* Optional Overlay (Remove if not needed) */}
                            <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Hero;
