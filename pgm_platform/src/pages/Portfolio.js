import React from 'react';
import usePortfolioData from '../hooks/usePortfolioData';
import { Box, Grid, Container, CircularProgress, Alert, Card, CardContent } from '@mui/material';
import PortfolioItem from '../components/PortfolioItem';
import { Helmet } from 'react-helmet';

export default function Portfolio() {
  const { data: portfolios, isLoading, error } = usePortfolioData();

  if (isLoading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Alert severity='error'>Oops... foutje</Alert>;
  }
  if (!portfolios) {
    return <Alert severity='warning'>Geen portfolios</Alert>;
  }

  return (
    <>
    <Helmet>
      <title>Studenten Portfolio's - Code School</title>
      <meta name="description" content="Bekijk de indrukwekkende portfolio's van onze studenten en zie wat je kunt bereiken bij Code School." />
      <meta name="keywords" content="Code School portfolio's, studenten werken, programmeerprojecten" />
    </Helmet>

    <Container maxWidth="lg">
      <Box className="videoContainer">
        <Card>
          <CardContent>
          <video
            autoPlay
            loop
            muted
            poster="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          >
            <source
              src="https://videos.pexels.com/video-files/853789/853789-hd_1920_1080_25fps.mp4"
            />
          </video>
          </CardContent>  
        </Card>
      </Box>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {portfolios.map(portfolio => (
          <PortfolioItem
            pic={portfolio.portfolioPic}
            titel={portfolio.portfolioTitel}
            omschrijving={portfolio.portfolioOmschrijving}
            key={`portfolio-${portfolio.id}`}
          />
          ))
        }
      </Grid>
    </Container>
    </>
  );
}
