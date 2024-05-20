import React, { useState } from 'react'
import useTeamData from '../hooks/useTeamData'
import { CircularProgress, Alert, Box, Paper, Typography, Grid, ButtonBase } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore'; 
import { Helmet } from 'react-helmet';

export default function Team() {
  const { data: instructeurs, isLoading, error } = useTeamData();
  const [selectedInstructeur, setSelectedInstructeur] = useState(null);
  // console.log(team);
  if(isLoading) {
    return <CircularProgress />
  }
  if(error) {
    return <Alert severity='error'>Error fetching data</Alert>
  }

  const handleSelectInstructeur = (instructeur) => {
    // Determine if the current selected instructor should be toggled off or a new one should be toggled on
    const newInstructeur = selectedInstructeur && selectedInstructeur.id === instructeur.id ? null : instructeur;
    setSelectedInstructeur(newInstructeur); // Set the new instructor or null
  };

  return (
    <>
    <Helmet>
      <title>Ons Team - De Experts achter Code School</title>
      <meta name="description" content="Maak kennis met het team van ervaren instructeurs en ondersteunend personeel bij Code School." />
      <meta name="keywords" content="Code School team, instructeurs, onderwijs professionals" />
    </Helmet>

    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        {instructeurs.map((instructeur) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={instructeur.id}>
          <ButtonBase sx={{ width: '100%', display: 'block' }} onClick={() => handleSelectInstructeur(instructeur)}>
            <Paper sx={{ 
                width: '100%', 
                paddingTop: '100%', // 1:1 Aspect Ratio
                position: 'relative', 
                overflow: 'hidden' // Prevents content spillover
            }}>
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                background: instructeur.instructeurPic ? `url(${instructeur.instructeurPic}) center/cover` : '#ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {!instructeur.instructeurPic && <ExpandMore />}
              </Box>
            </Paper>
          </ButtonBase>
        </Grid>
      ))}
    </Grid>
    {selectedInstructeur && (
      <Box sx={{ mt: 4, p: 2, border: '1px solid gray', borderRadius: '4px' }}>
        <Typography variant="h5">{`${selectedInstructeur.instructeurVoornaam} ${selectedInstructeur.instructeurFamilienaam}`}</Typography>
        <Typography paragraph>Bio • {selectedInstructeur.instructeurBio}</Typography>
        {selectedInstructeur.vakken && selectedInstructeur.vakken.length > 0 ? (
          <Typography sx={{ fontStyle: 'italic' }}>Vakken: {selectedInstructeur.vakken.map(vak => vak.vakTitel).join(', ')}</Typography>
        ) : (
          <Typography sx={{ fontStyle: 'italic' }}>Geen opleidingen</Typography>
        )}
        <img src={selectedInstructeur.instructeurPic} alt={`${selectedInstructeur.instructeurVoornaam} ${selectedInstructeur.instructeurFamilienaam}`} style={{ width: '100%', height: 'auto', mt: 2 }} />
      </Box>
    )}
  </Box>
  </>
);
}