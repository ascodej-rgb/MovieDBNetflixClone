
import styles from "./footer.module.css";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    url: "https://www.facebook.com/netflix",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/netflix",
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    url: "https://x.com/netflix",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    url: "https://www.youtube.com/netflix",
  },
];

const footerColumns = [
  [
    { label: "Audio Description", href: "#" },
    { label: "Investor Relations", href: "#" },
    { label: "Legal Notices", href: "#" },
  ],
  [
    { label: "Help Centre", href: "#" },
    { label: "Jobs", href: "#" },
    { label: "Cookie Preferences", href: "#" },
  ],
  [
    { label: "Gift Cards", href: "#" },
    { label: "Terms of Use", href: "#" },
    { label: "Corporate Information", href: "#" },
  ],
  [
    { label: "Media Centre", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Social media icons */}
        <div className={styles.socialLinks}>
          {socialLinks.map(({ name, icon: Icon, url }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className={styles.socialIcon}
            >
              <Icon />
            </a>
          ))}
        </div>

        {/* Footer link columns */}
        <nav
          className={styles.footerLinks}
          aria-label="Footer navigation"
        >
          {footerColumns.map((column, index) => (
            <ul className={styles.linkColumn} key={index}>
              {column.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          ))}
        </nav>

        {/* Copyright */}
        <p className={styles.copyright}>
          © 1997–2026 Netflix, Inc.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
