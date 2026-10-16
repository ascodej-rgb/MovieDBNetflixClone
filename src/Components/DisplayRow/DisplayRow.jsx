import React, { useEffect, useState } from 'react'
import SlideShow from '../SlideShow/SlideShow'
import {movies} from "../../Data/Data"
import { movieInstance } from '../../Utility/MovieInstance'
import requests from '../../Utility/requestUrls'
import styles from './DisplayRow.module.css'


function DisplayRow() {
const [movieRows, setMovieRows] = useState({
    trending: [],
    netflixOriginals: [],
    topRated: [],
    action: [],
    comedy: [],
    horror: [],
    romance: [],
    documentaries: []

})

const fetchMovies = async ()=>{
    try{
        const [trendingRes,netflixRes, topRatedRes, actionRes, comedyRes, horrorRes, romanceRes, docRes] = await Promise.all([

              movieInstance.get(requests.fetchTrending),
            movieInstance.get(requests.fetchNetflixOriginals),
            movieInstance.get(requests.fetchTopRatedMovies),
            movieInstance.get(requests.fetchActionMovies),
            movieInstance.get(requests.fetchComedyMovies),
            movieInstance.get(requests.fetchHorrorMovies),
            movieInstance.get(requests.fetchRomanceMovies),
            movieInstance.get(requests.fetchDocumentaries)
        ]
        )
        setMovieRows({
            trending:trendingRes.data.results,
            netflixOriginals:netflixRes.data.results,
            topRated:topRatedRes.data.results,
            action: actionRes.data.results,
            comedy: comedyRes.data.results,
            horror: horrorRes.data.results,
            romance: romanceRes.data.results,
            documentaries: docRes.data.results

        } 
        )
    } catch(error){
               console.error("Unable to load movie rows from TMDB:", error)
               setMovieRows((currentRows) => ({
                ...currentRows,
                trending: movies,
               }))
            }

}

useEffect(()=>{
    fetchMovies()
},[])

  return (
        <div className={styles.mainWrapper}>
<SlideShow title ="Movie Suggestions" movies = {movieRows.trending}/>
<SlideShow title ="Popular on Netflix" movies = {movieRows.netflixOriginals}/>
<SlideShow title ="Trending Now" movies = {movieRows.action}/>
<SlideShow title ="New Releases" movies = {movieRows.topRated}/>
<SlideShow title ="New Releases" movies = {movieRows.horror}/>
<SlideShow title ="New Releases" movies = {movieRows.comedy}/>
<SlideShow title ="New Releases" movies = {movieRows.documentaries}/>

    </div>
  )
}

export default DisplayRow