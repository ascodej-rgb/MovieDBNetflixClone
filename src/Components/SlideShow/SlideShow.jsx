import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from './SlideShow.module.css'
// import Swiper JS
import {Swiper, SwiperSlide} from 'swiper/react';
// import Swiper styles
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';


function SlideShow({ title, movies }) {
  return (
    <div>
      <h2 className={styles.title }>{title}</h2>
      <div className={styles.Row}>

        <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={5.8}

        
        >
        {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
          <MovieCard key={movie.id} movie={movie} />
          </SwiperSlide>
        ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SlideShow;
