import React from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import Logo from './Logo';
import { ROUTES } from '../routes/routes';
import { NavLink } from 'react-router-dom';

export default function Footer() {

  return (
    <footer>
        <>
        <Divider textAlign='left' className='divider'>
            more about us... 
        </Divider>
        <Grid container justifyContent="space-between" alignItems="top" padding={2} gap={4}>
            <Grid item xs={12} sm={6} md={4}>
                <a href={ROUTES.home.path}>
                    <Logo />
                    {/* <img src={isDarkMode ? logoDark : logo}  className={styles.logo} alt='logo' /> */}
                </a>
            </Grid>
            <Grid item>
                <p><b>SMART education</b></p>
                <p>Campus Erwétegem Weide – Stallinge A</p>
                <p>Chique Dinges Bd. 2B</p>
                <p>8500 Erwétegem City</p>

                <p>+32 56 24 12 10</p>
                <p>smart@education.be</p>
            </Grid>
            <Grid item>
                <p><b>Join the community</b></p>
                <p>Bekijk hier de foto's van al onze koeien...</p>
                <div>
                    <a href="https://www.facebook.com/howestmct" target="_blank" rel="noreferrer">
                        <img src="https://img.icons8.com/color/48/000000/facebook.png" alt="facebook"/>
                    </a>
                    <a href="https://www.instagram.com/howestmct/" target="_blank" rel="noreferrer">
                        <img src="https://img.icons8.com/color/48/000000/instagram-new--v1.png" alt="instagram"/>
                    </a>
                    <a href="https://www.linkedin.com/school/howest-mct/" target="_blank" rel="noreferrer">
                        <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="linkedin"/>
                    </a>
                    <a href="https://twitter.com/howestmct" target="_blank" rel="noreferrer">
                        <img src="https://img.icons8.com/color/48/000000/twitter--v1.png" alt="twitter"/>
                    </a>
                </div>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item className='disclaimer'>
                <Typography variant='body1'>
                    MADE BY SUPERSMART - 2024 - <NavLink to={ ROUTES.disclaimer.path }>DISCLAIMER</NavLink> - A SMART BACHELOR</Typography>
            </Grid>
        </Grid>
        </>
    </footer>
  );
}
