import React from 'react'
import useOpleidingData from '../hooks/useOpleidingData';
import { CircularProgress, Alert, Container, Grid, Card } from '@mui/material';
import OpleidingItem from '../components/OpleidingItem';


export default function Opleidingen() {
  const { data:opleidingen, isLoading, error } = useOpleidingData();
  // console.log(opleidingen);

  if (isLoading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Alert severity='error'>Oops... foutje</Alert>;
  }
  if (!opleidingen) {
    return <Alert severity='warning'>Geen opleidingen</Alert>;
  }

  return (
    <Grid container spacing={2} sx={{ marginTop: 2 }} className='opleidingen'>
      {opleidingen.map(opleiding => (
          <OpleidingItem 
            pic={opleiding.opleidingPic}
            titel={opleiding.opleidingTitel}
            omschrijving={opleiding.opleidingOmschrijving}
            ects={opleiding.opleidingEcts}
            key={`opleiding-${opleiding.id}`}
          />
          ))
        }
    </Grid>
  )
}

