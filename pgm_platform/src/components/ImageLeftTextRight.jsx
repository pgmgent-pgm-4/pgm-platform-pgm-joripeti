import React from 'react';
import styles from './imageLeftTextRight.module.css';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';

export default function ImageLeftTextRight({ imageSrc, textContent }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid container spacing={4} direction={matches ? 'column-reverse' : 'row'}>
      <Grid item xs={12} xl={6}>
        <img src={imageSrc} className={styles.image} alt={textContent} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant='body1' className={styles.text} style={{ color: theme.palette.text.primary}}>
          {textContent}
        </Typography>
      </Grid>
    </Grid>
  )
}
