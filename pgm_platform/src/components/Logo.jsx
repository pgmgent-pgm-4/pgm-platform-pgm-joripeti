import React, { useContext, useState } from 'react';
import { ReactComponent as LogoLight } from '../assets/logo3-light.svg';
import { ReactComponent as LogoDark } from '../assets/logo3-dark.svg';
import styles from './logo.module.css';
import { ThemeContext } from '../context/ThemeContext';
import { useTheme } from '@mui/material/styles'; // Import the material UI useTheme hook

export default function Logo() {
    const { isDarkMode } = useContext(ThemeContext);
    const theme = useTheme(); // Get the theme object
    const [color, setColor] = useState('currentColor'); // Default color

    const handleMouseEnter = () => setColor(theme.palette.primary.main);
    const handleMouseLeave = () => setColor('currentColor');
    const handleMouseDown = () => setColor(theme.palette.secondary.main);
    const handleMouseUp = () => setColor('currentColor'); 

    return (
        <div
            className={styles.logo_container}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {isDarkMode ? 
                <LogoDark className={styles.logo} style={{ fill: color }} /> :
                <LogoLight className={styles.logo} style={{ fill: color }} />}
        </div>
    );
}
