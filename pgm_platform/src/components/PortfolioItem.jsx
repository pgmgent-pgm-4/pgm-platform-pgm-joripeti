import React from 'react'
import { Box, Grid, Typography } from '@mui/material';

export default function PortfolioItem({ pic, titel, omschrijving }) {
  return (
    <Grid item xs={6} sm={4} md={3} className="gridItem">
    <Box className="portfolioImage" style={{
      backgroundImage: `url(${pic})`,
      paddingTop: '100%', // maakt aspect ratio van de div 1:1 (square div)
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative' //om de overlay absoluut te positioneren
    }}>
      <Box className="imageOverlay">
        <Typography variant="h6" sx={{ color: '#fff', textAlign: 'center', padding: '0 10px' }}>
          {titel}
        </Typography>
        <Typography variant="body1" sx={{ color: '#fff', textAlign: 'center' }}>
          {omschrijving}
        </Typography>
      </Box>
    </Box>
  </Grid>
  )
}
