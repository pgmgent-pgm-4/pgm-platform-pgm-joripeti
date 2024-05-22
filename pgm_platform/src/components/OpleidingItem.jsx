import React from 'react'
import { Box, Typography, Grid } from '@mui/material';

export default function OpleidingItem({ pic, titel, omschrijving, ects }) {
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
                    Titel • {titel}
                </Typography>
                <Typography variant="body1" sx={{ color: '#fff', textAlign: 'center' }}>
                    Omschrijving • {omschrijving}
                </Typography>
                <Typography variant="body1" >
                    ECTS • {ects}
                </Typography>
            </Box>
     </Box>
  </Grid>
  )
}
