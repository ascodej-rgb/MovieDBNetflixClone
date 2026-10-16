import React, { useEffect, useState } from "react";
import logo from "../../assets/image/logo.png";
import { Link } from "react-router-dom";
import { Search, Bell, User, ChevronDown } from "lucide-react";
import styles from "./header.module.css";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // for blur effect on scroll
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* logo */}
        <img src={logo} alt="Netflix Logo" className={styles.logo} />

        {/* navigation */}
        <nav className={styles.nav}>
          <Link className={styles.navLink} to="/">
            Home
          </Link>
          <Link className={styles.navLink} to="/tv-shows">
            TV Shows
          </Link>
          <Link className={styles.navLink} to="/movies">
            Movies
          </Link>
          <Link className={styles.navLink} to="/new-and-popular">
            New & Popular
          </Link>
          <Link className={styles.navLink} to="/my-list">
            My List
          </Link>
          <Link className={styles.navLink} to="/browse-by-language">
            Browse by language
          </Link>
        </nav>
        {/* right sidesections */}

        <div className={styles.rightSection}>
          {/* search */}
          <div className={styles.searchContainer}>
            <button
              type="button"
              onClick={() => setIsSearchOpen((open) => !open)}
              className={styles.searchButton}
              aria-label={isSearchOpen ? "Close search" : "Open search"}
              aria-expanded={isSearchOpen}
            >
              <Search size={20} />
            </button>
            {isSearchOpen && (
              <input
                type="text"
                placeholder="Search movie title"
                className={styles.searchInput}
                aria-label="Search movie title"
                autoFocus
              />
            )}
          </div>
          {/* notifications */}
          <button className={styles.iconButton}>
            <Bell />
            <span className={styles.notificationBadge}>4</span>
          </button>
          {/* profile */}
          <div className={styles.profileContainer}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((open) => !open)}
              className={styles.profileButton}
              aria-label="Profile menu"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              <div className={styles.profileAvatar}>
                <User size={20} />
              </div>

              <ChevronDown />
            </button>

            {isProfileOpen && (
              <div className={styles.profileDropdown}>
                <Link to="/account" className={styles.dropdownItem}>
                  Account
                </Link>
                <Link to="/settings" className={styles.dropdownItem}>
                  Settings
                </Link>
                <hr className={styles.profileDiver} />
                <Link to="/logout" className={styles.dropdownItem}>
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
