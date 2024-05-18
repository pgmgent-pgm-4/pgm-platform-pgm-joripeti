import React from 'react';
import { useMediaQuery, Grid, useTheme, Box } from '@mui/material';

export default function ImageRightTextLeft({ imageSrc, textContent }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Grid container spacing={4} direction={matches ? 'column-reverse' : 'row'}>
            <Grid item xs={12} md={6} sx={{padding: 2 }}>
                <div>{textContent}</div>
            </Grid>
            <Grid item xs={12} md={6} sx={{padding: 2 }}>
                <Box
                    sx={{
                        height: '100%',  // Stel de hoogte en breedte in afhankelijk van je layout
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',  // Verbergt alles buiten de box
                        backgroundImage: `url(${imageSrc})`,
                        backgroundPosition: 'center',  // Centreert de afbeelding in de box
                        backgroundSize: 'cover',  //  de afbeelding schalen om de container te bedekken zonder te stretchen
                        backgroundRepeat: 'no-repeat',  // Voorkomt het herhalen van de afbeelding
                        borderRadius: '.2rem',
                    }}
                />
            </Grid>
        </Grid>
    );
}
