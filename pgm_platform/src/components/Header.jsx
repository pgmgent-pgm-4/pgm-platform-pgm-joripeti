import React from 'react';
import { Grid } from '@mui/material';
import { Navigation, LightSwitch } from './index';
import Logo from './Logo';
import styles from './header.module.css';
import { ROUTES } from '../routes/routes';

export default function Header() {
    return (
        <header className={styles.header}>
          <Grid container justifyContent="space-between" alignItems="center" padding={2}>
            <Grid item xs={12} sm={6} md={4}>
              <a href={ROUTES.home.path}>
                <Logo />
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