// Navigation.js
import React from 'react';
import { Grid } from '@mui/material';
import { ROUTES } from '../routes/routes';
import styles from './navigation.module.css';
import StyledNavLink from './StyledNavLink';

export default function Navigation() {
    // make an array of all routes except the home, notFound, and blogPost routes
    const routesArray = Object.entries(ROUTES)
        .filter(([key, route]) => 
            key !== 'home' &&        
            key !== 'notFound' &&    
            key !== 'blogPost' &&
            key !== 'disclaimer'       
        )
        .map(([key, route]) => route); // get the route objects and put them in an array

    return (
        <div className={styles.gridContainer}>
            {routesArray.map((route, index) => (
                <StyledNavLink 
                    to={route.path} 
                    key={index} 
                    className={`${styles.gridItem} ${index < 6 ? styles.firstRowItem : ""}`}>
                    {route.title}
                </StyledNavLink>
            ))}
        </div>
    );
}
