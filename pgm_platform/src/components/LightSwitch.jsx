import React, { useContext, useEffect } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import styles from './lightSwitch.module.css';

export default function LightSwitch() {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  useEffect(() => {
    isDarkMode ? document.body.classList.add("dark") : document.body.classList.remove("dark");
    }, [isDarkMode]);
  return (
    <div className={styles.switchGroup}>
        <div className={styles.icon}>
            <IoIosSunny size={35} />
        </div>
        <div className={styles.toggle} onClick={() => setIsDarkMode(!isDarkMode)} aria-label="Toggle theme">
            {isDarkMode ? <FaToggleOn size={40} /> : <FaToggleOff size={40} />}
        </div>
        <div className={styles.icon}>
            <IoIosMoon size={35} />
        </div>
    </div>
  )
}
