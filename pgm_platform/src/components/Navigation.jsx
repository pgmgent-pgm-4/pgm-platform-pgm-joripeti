// Navigation.js
import React from 'react';
import { Badge, Grid } from '@mui/material';
import { ROUTES } from '../routes/routes';
import styles from './navigation.module.css';
import StyledNavLink from './StyledNavLink';

import { useBlogData } from '../context/BlogContext';

export default function Navigation() {

    const { blogCount } = useBlogData(); 

    // make an array of all routes except the home, notFound, and blogPost routes
    const routesArray = Object.entries(ROUTES)
        .filter(([key, route]) => 
            key !== 'home' &&        
            key !== 'notFound' &&    
            key !== 'blogPost' &&
            key !== 'disclaimer' &&
            key !== 'opleiding'       
        )
        .map(([key, route]) => ({ ...route, key })); // Include the key to check for 'blog'

    return (
        <div className={styles.gridContainer}>
            {routesArray.map((route, index) => { // map met curly braces omdat het een functie is
                const isBlog = route.key === 'blog';
                // console.log(route.key, isBlog); // hier kan je zien welke route gedetecteerd wordt
                const linkContent = isBlog ? (
                    <Badge badgeContent={blogCount} color='secondary' className='badge'>
                        {route.title}
                    </Badge>
                ) : (
                    route.title
                );
                return (
                <StyledNavLink 
                    to={route.path} 
                    key={index} 
                    className={`${styles.gridItem} ${index < 6 ? styles.firstRowItem : ""}`}>
                    {linkContent}  
                </StyledNavLink>
                ); // navlink includes linkContent with route.title and if blog, also the badge
            })}
        </div>
    );
}
