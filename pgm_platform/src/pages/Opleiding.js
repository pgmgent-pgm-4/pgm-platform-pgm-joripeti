import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchOpleiding from '../hooks/useFetchOpleiding';
import { CircularProgress, Typography, Box } from '@mui/material';

export default function Opleiding() {

  // get id from query string
  const searchParams = useParams(); // destructuring the id from the query string as an object (not array) 
  const opleidingId = searchParams.id; // get the id from the object
  // fetch the blogpost with the id from the query string
  const { opleiding, isLoading, error } = useFetchOpleiding(opleidingId);
  console.log(opleidingId);
  if(isLoading) {
    return <CircularProgress />;
  }

  if(error) {
    return <Typography color="error">opleiding kon niet geladen worden: {error.message}</Typography>;
  }

  // display the blogpost
  return (
    <Box sx={{ p: 3 }}>
      {opleiding && (
        <>
          <Typography variant="h1" gutterBottom>
            {opleiding.opleidingTitel}
          </Typography>
          <img src={opleiding.opleidingPic} alt={opleiding.opleidingTitel} style={{ width: '100%', height: 'auto' }} />
          <Typography variant="body1" gutterBottom>
            {opleiding.opleidingOmschrijving}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            ECTS • {opleiding.opleidingEcts}
          </Typography>
        </>
      )}
    </Box>
  );
};

