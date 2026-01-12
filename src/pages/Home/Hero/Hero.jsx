import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070",
    title: "Find Your Perfect Tutor",
    subtitle:
      "Expert guidance for every subject. Connect with qualified mentors to boost your grades and confidence.",
    btnText: "Find Tutors",
    btnLink: "/tutors",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070",
    title: "Learn Without Limits",
    subtitle:
      "Access world-class education from anywhere. Flexible schedules designed for your modern lifestyle.",
    btnText: "Explore Tuitions",
    btnLink: "/tuitions",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1541339907198-e08756dee81c?q=80&w=2070",
    title: "Shape Your Future Today",
    subtitle:
      "Join a community of learners and educators. Your journey towards academic excellence starts here.",
    btnText: "Join Now",
    btnLink: "/login",
  },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="w-full h-[60vh] md:h-[500px] relative overflow-hidden bg-black">
      <Swiper
        effect="fade"
        centeredSlides
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.img}
                alt="slide"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
                <div className="max-w-4xl space-y-8">
                  
                  {/* TITLE */}
                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white">
                    <Typewriter
                      key={activeIndex}   
                      words={[slides[activeIndex].title]}
                      loop={1}
                      cursor
                      cursorStyle="|"
                      typeSpeed={60}
                    />
                  </h1>

                  {/* SUBTITLE */}
                  <p className="text-lg md:text-2xl text-white max-w-2xl mx-auto">
                    {slides[activeIndex].subtitle}
                  </p>

                  {/* BUTTON */}
                  <button
                    onClick={() => navigate(slides[activeIndex].btnLink)}
                    className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-full transition-all hover:scale-105"
                  >
                    {slides[activeIndex].btnText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
