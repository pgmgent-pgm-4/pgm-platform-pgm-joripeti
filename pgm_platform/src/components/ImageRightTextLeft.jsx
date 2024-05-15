import React from 'react'
import styles from './imageRightTextLeft.module.css'
import { useMediaQuery, Typography, Grid, useTheme } from '@mui/material';

export default function ImageRightTextLeft({ imageSrc, textContent }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
  
    return (
        <Grid container spacing={2} direction={matches ? 'column-reverse' : 'row'}>
            <Grid item xs={12} md={6}>
                <Typography variant='body1' className={styles.textContent} style={{ color: theme.palette.text.primary}}>
                    {textContent}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <img src={imageSrc} className={styles.image} alt={textContent} />
            </Grid>
        </Grid>
  )
}
