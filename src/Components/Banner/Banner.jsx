import React, { useEffect, useRef, useState } from 'react'
import netflixBanner from '../../assets/image/logo.png'
import fallbackBannerImage from '../../assets/image/banner.jpeg'
import {Play, Info} from 'lucide-react'
import styles from './banner.module.css'
import { movieInstance } from '../../Utility/MovieInstance'
import requests from '../../Utility/requestUrls'
const BANNER_BASE = "https://image.tmdb.org/t/p/original"
const BANNER_ROTATION_INTERVAL = 8000

function Banner() {
  const [featuredShows, setFeaturedShows] = useState([])
  const [featuredShowIndex, setFeaturedShowIndex] = useState(0)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [canExpandDescription, setCanExpandDescription] = useState(false)
  const descriptionRef = useRef(null)

  useEffect(() => {
    let isActive = true

    async function fetchFeaturedShows() {
      try {
        const response = await movieInstance.get(requests.fetchNetflixOriginals)
        const shows = response.data.results.filter((show) => show.backdrop_path)

        if (shows.length === 0) {
          console.error("TMDB returned no shows with banner images.")
          return
        }

        if (isActive) {
          setFeaturedShows(shows)
          setFeaturedShowIndex(Math.floor(Math.random() * shows.length))
        }
      } catch (error) {
        console.error("Unable to load banner shows from TMDB:", error)
      }
    }

    fetchFeaturedShows()
    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    if (featuredShows.length < 2) return

    const intervalId = window.setInterval(() => {
      setFeaturedShowIndex((currentIndex) => {
        let nextIndex = Math.floor(Math.random() * featuredShows.length)
        if (nextIndex === currentIndex) {
          nextIndex = (nextIndex + 1) % featuredShows.length
        }
        return nextIndex
      })
    }, BANNER_ROTATION_INTERVAL)

    return () => window.clearInterval(intervalId)
  }, [featuredShows.length])

  const featuredShow = featuredShows[featuredShowIndex]
  const description = featuredShow?.overview ||
    "A young man discovers his true identity and destiny in a world of magic and mystery."

  useEffect(() => {
    const paragraph = descriptionRef.current
    if (!paragraph) return

    setIsDescriptionExpanded(false)

    const measureDescription = () => {
      const measureNode = paragraph.cloneNode(true)
      const computedStyle = window.getComputedStyle(paragraph)
      measureNode.style.position = "fixed"
      measureNode.style.visibility = "hidden"
      measureNode.style.pointerEvents = "none"
      measureNode.style.display = "block"
      measureNode.style.height = "auto"
      measureNode.style.maxHeight = "none"
      measureNode.style.overflow = "visible"
      measureNode.style.webkitLineClamp = "unset"
      measureNode.style.width = `${paragraph.clientWidth}px`
      document.body.appendChild(measureNode)

      const lineHeight = Number.parseFloat(computedStyle.lineHeight)
      const lineCount = measureNode.getBoundingClientRect().height / lineHeight
      measureNode.remove()

      setCanExpandDescription(description.length > 200 || lineCount > 2.05)
    }

    measureDescription()
    const resizeObserver = new ResizeObserver(measureDescription)
    resizeObserver.observe(paragraph)

    return () => resizeObserver.disconnect()
  }, [description])

  const bannerImageUrl = featuredShow
    ? `${BANNER_BASE}${featuredShow.backdrop_path}`
    : fallbackBannerImage

  return (
    <div
      className={styles.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent 55%), linear-gradient(to right, rgba(0, 0, 0, 0.45), transparent 70%), url("${bannerImageUrl}")`,
      }}
    >
      <div className={styles.content}>
        <img src={netflixBanner} alt="Netflix Banner" className={styles.logoImg} />
        <h1 className={styles.title}>{featuredShow?.name || "Bridegroom"}</h1>
        <p
          ref={descriptionRef}
          className={`${styles.description} ${
            canExpandDescription && !isDescriptionExpanded
              ? styles.descriptionCollapsed
              : ""
          }`}
        >
          {description}
        </p>
        {canExpandDescription && (
          <button
            type="button"
            className={styles.readMoreButton}
            aria-expanded={isDescriptionExpanded}
            onClick={() => setIsDescriptionExpanded((expanded) => !expanded)}
          >
            {isDescriptionExpanded ? "Read less" : "Read more"}
          </button>
        )}
        <div className={styles.buttonContainer}>
          <button className={styles.button}>
            <Play size={30} />
            Watch Now
          </button>
          <button className={styles.button}>
            <Info size={30} />
            My List
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner