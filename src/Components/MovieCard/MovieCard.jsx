import React from "react";
import styles from "./MovieCard.module.css";
import { FaPlayCircle } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import { GoCheckCircleFill } from "react-icons/go";
import { IoIosArrowDropdown } from "react-icons/io";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500"

function getPosterUrl(path) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/src/") || path.startsWith("/assets/")) {
    return path;
  }
  return `${IMAGE_BASE}${path}`;
}

function MovieCard({ movie }) {
  let generes = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Thriller",
  ];
  return (
    <div className={styles.cardWrapper}>
      {/* psoter image */}
      <img className={styles.poster} src={getPosterUrl(movie.poster_path)} alt={movie.title || "Movie poster"} />
      {/* hover card */}
      <div className={styles.hoverCard}>
        {/* img */}

        <img className={styles.hoverImage} src={getPosterUrl(movie.poster_path)} alt={movie.title || "Movie poster"} />
        {/* badge */}
        <div className={styles.badge}>Recently Added</div>
        {/* button row*/}
        <div className={styles.buttonsRow}>
          <FaPlayCircle className = {styles.circleButton} size={40} color="white" />
          <BsPlusCircle className = {styles.circleButton} size={40} color = "white"/>
          <GoCheckCircleFill className = {styles.circleButton} size={40} color="white" />
          <IoIosArrowDropdown className = {styles.circleButtonSmall} size={40} color="white" />
        </div>
        {/* meta data row */}
        <div className={styles.metaRow}>
          <span className = {styles.tag}>U/A</span>
          <span className = {styles.tag}>Movie</span>
          <span className = {styles.tag}>HD</span>
        </div>
        {/* geners */}

        <div className={styles.geners}>
          {generes?.map((g, index) => (
            <span key={index}>
              {g}
              {index < generes.length - 1 && <span className={styles.dot}> • </span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
