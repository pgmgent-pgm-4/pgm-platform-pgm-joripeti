import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Grid, Paper, Typography, Popover, Box } from '@mui/material';
import useCurriculaData from '../hooks/useCurriculaData';
import { BiBorderRadius } from 'react-icons/bi';

const ProgrammaPage = () => {
  const { data: curricula, isLoading } = useCurriculaData();
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVak, setSelectedVak] = useState(null);

  useEffect(() => {
    if (curricula.length > 0 && !selectedCurriculum) {
      setSelectedCurriculum(curricula[0]);
    }
  }, [curricula, selectedCurriculum]);

  const handleVakClick = (event, vak) => {
    setAnchorEl(event.currentTarget);
    setSelectedVak(vak);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedVak(null);
  };

  function getColorClass(color) {
    const baseName = 'bg-';
    return `${baseName}${color}`;
  }
  

  if (isLoading) return <div>Loading...</div>;

  // Voorbereiden van data voor de semesters
  const semesterGroups = Array.from({ length: 6 }, (_, i) => ({
    semester: i + 1,
    vakken: []
  }));

  selectedCurriculum?.opleidingen.forEach(opleiding => {
    opleiding.vakken.forEach(vak => {
      const group = semesterGroups.find(g => g.semester === vak.semester);
      if (group) {
        group.vakken.push({
          ...vak,
          opleidingTitel: opleiding.opleidingTitel
        });
      }
    });
  });

  // tags voor de vakken
  const allTags = new Set();
  selectedCurriculum?.opleidingen.flatMap(opleiding => 
    opleiding.vakken.flatMap(vak => vak.tags))
    .forEach(tag => allTags.add(tag));

  // console.log("Tag kleuren", [...allTags].map(tag => tag.kleur));
  // console.log("Vak kleuren", selectedCurriculum?.opleidingen.flatMap(opleiding => opleiding.vakken.flatMap(vak => vak.tags.map(tag => tag.kleur))));
    

  return (
    <div>
      <AppBar position="static" color="blueGrey">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }, {mb: .7}, {mr: 5}}>
            selecteer een curriculum:
          </Typography>
          {curricula.map(curriculum => (
            <Button
              key={curriculum.id}
              onClick={() => setSelectedCurriculum(curriculum)}
              color="inherit"
            >
              {curriculum.curriculumTitel}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mt: 8, justifyContent: 'center', alignItems: 'center' }}>
          {[...allTags].map(tag => (
            <>
              <Box sx={{ width: 15, height: 15, borderRadius: 50 }} className={getColorClass(tag.kleur )}>
              </Box>
              <Box key={tag.id} >
                <Typography variant="h6" className='tag title'>{tag.tagTitel}</Typography>
              </Box>
            </>
          ))}
      </Box>
      <Grid container spacing={2} mt={4} className='grid vakken'>
        {semesterGroups.map(({ semester, vakken }) => (
          <Grid item key={semester} xs={2}>
            <Typography variant="h5" gutterBottom mb={4}>{`Semester ${semester}`}</Typography>
            {vakken.map(vak => (
              <Paper
                key={vak.id}
                style={{ padding: 10, cursor: 'pointer' }}
                onClick={(event) => handleVakClick(event, vak)}
                elevation={3}
              >
                <Typography variant="h5">{vak.vakTitel}</Typography>
                <Typography variant="h6" color="textSecondary">{vak.opleidingTitel}</Typography>
                <Box className={getColorClass(vak.tags[0]?.kleur)} sx={{ width: 20, height: 20, borderRadius: 50, mt: 2 }}></Box>
              </Paper>
            ))}
          </Grid>
        ))}
      </Grid>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {selectedVak && (
          <div style={{ padding: 20 }}>
            <Typography variant="h5">{selectedVak.vakTitel}</Typography>
            <Typography>{selectedVak.vakOmschrijving}</Typography>
            <img src={selectedVak.vakPic} alt={selectedVak.vakTitel} style={{ width: '100%' }} />
          </div>
        )}
      </Popover>
    </div>
  );
};

export default ProgrammaPage;
