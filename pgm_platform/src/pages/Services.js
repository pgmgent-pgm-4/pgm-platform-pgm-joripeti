import React from 'react'
import useServiceData from '../hooks/useServiceData'
import { Alert, Box, CircularProgress, Container, Grid, Typography } from '@mui/material'


export default function Services() {
  const { data: services, isLoading, error } = useServiceData();
  // console.log(services);

  // Random Image bovenaan
  const randomIndex = services[Math.floor(Math.random() * services.length)];
  const randomServiceImage = randomIndex?.servicePic;

  if(isLoading) {
    return <CircularProgress />
  }
  if(error) {
    return <Alert severity='error'>Error fetching data</Alert>
  }

return (
    <Container maxWidth="lg">
      {/* Random Image at the top */}
      <Box sx={{ width: '100%', overflow: 'hidden' }}>
        <img src={randomServiceImage} alt="Featured Service" style={{ width: '100%', height: 'auto' }} />
      </Box>

      {/* Text & Image secties */}
      {services.map((service, index) => (
        <Grid container spacing={2} sx={{ my: 4 }} key={service.id}>
          <Grid item xs={12} md={6} order={{ xs: index % 2 === 0 ? 2 : 1 }}>
            <Typography variant="h5" component="h2">{service.serviceTitel}</Typography>
            <Typography>{service.serviceOmschrijving}</Typography>
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: index % 2 === 0 ? 1 : 2 }}>
            <img src={service.servicePic} alt={service.serviceTitel} style={{ width: '100%', height: 'auto' }} />
          </Grid>
        </Grid>
      ))}

      {/* Services Grid
      <Grid container spacing={2}>
        {services.map(service => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={service.id}>
            <ButtonBase sx={{ width: '100%', display: 'block', textAlign: 'initial' }}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <img src={service.servicePic} alt={service.serviceTitel} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
                <Typography variant="h6">{service.serviceTitel}</Typography>
              </Paper>
            </ButtonBase>
          </Grid>
        ))}
      </Grid> */}
    </Container>
  );
}