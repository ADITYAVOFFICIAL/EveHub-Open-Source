import React, { useRef } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ExploreEventCard from "./ExploreEventCard";

function EventCarousel({ events, title }) {
  const firstSwiperRef = useRef(null);
  const secondSwiperRef = useRef(null);

  // Calculate the number of remaining events
  const remainingEvents = events && events.length > 4 ? events.slice(4) : [];

  return (
    <div>
      <div className="inline-flex items-center w-full justify-between">
        <h1 className="page-title">{title} Events</h1>
        <div className="inline-flex text-primary gap-4 justify-end items-center">
          <button
            onClick={() => {
              firstSwiperRef.current.swiper.slidePrev();
              secondSwiperRef.current.swiper.slidePrev();
            }}
          >
            <IoArrowBack />
          </button>
          <button
            onClick={() => {
              firstSwiperRef.current.swiper.slideNext();
              secondSwiperRef.current.swiper.slideNext();
            }}
          >
            <IoArrowForward />
          </button>
        </div>
      </div>
      <div>
        <Swiper
          className="event-swiper"
          ref={firstSwiperRef}
          modules={[Navigation]}
          slidesPerView={4}
          spaceBetween={20}
          breakpoints={{
            360: {
              slidesPerView: 1,
            },
            560: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            820: {
              slidesPerView: 4,
            }
          }}
        >
          {events?.slice(0, 4).map((item) => (
            <SwiperSlide>
              <ExploreEventCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {remainingEvents.length > 0 && (
        <div>
          <Swiper
            className="event-swiper"
            ref={secondSwiperRef}
            modules={[Navigation]}
            slidesPerView={4}
            spaceBetween={20}
            breakpoints={{
              360: {
                slidesPerView: 1,
              },
              560: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
              820: {
                slidesPerView: 4,
              }
            }}
          >
            {remainingEvents.map((item) => (
              <SwiperSlide>
                <ExploreEventCard {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default EventCarousel;
