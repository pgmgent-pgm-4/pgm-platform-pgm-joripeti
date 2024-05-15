import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import { Navigation, LightSwitch } from './index';
import { ThemeContext } from '../context/ThemeContext';
import logo from '../assets/logo3-light.png';
import logoDark from '../assets/logo3-dark.png';
import Logo from './Logo';
import styles from './header.module.css';
import { ROUTES } from '../routes/routes';

export default function Header() {
    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
    return (
        <header className={styles.header}>
          <Grid container justifyContent="space-between" alignItems="center" padding={2}>
            <Grid item xs={12} sm={6} md={4}>
              <a href={ROUTES.home.path}>
                <Logo />
                {/* <img src={isDarkMode ? logoDark : logo} className={styles.logo} alt="logo" /> */}
              </a>
            </Grid>
            <Grid item>
              <LightSwitch />
            </Grid>
          </Grid>
          <Navigation />
        </header>
      );
    }