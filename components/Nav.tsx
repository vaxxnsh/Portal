"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { Button } from './Button';
import { useRouter } from 'next/router';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust threshold as needed
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.innerContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          Worktopia
        </Link>
        
        {/* Desktop Navigation - hidden when isMenuOpen is true */}
        <div className={`${styles.navLinks} ${isMenuOpen ? styles.hideNavLinks : ''}`}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/mentorship" className={styles.navLink}>Mentorship</Link>
          <Link href="/review" className={styles.navLink}>CV Review</Link>
          <Link href="/addjobs" className={styles.navLink}>Add Jobs</Link>
          <Button title="Sign Up" href="/sign-up"/>
          <Button title="Sign In" href="/sign-in"/>
        </div>
      </div>

    </div>
  );
};

export default Header;