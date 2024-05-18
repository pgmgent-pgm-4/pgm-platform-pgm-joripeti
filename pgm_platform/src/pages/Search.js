import React, { useState, useEffect, useContext } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Box, Typography, TextField, FormGroup, FormControlLabel, Switch, CircularProgress, Alert } from '@mui/material';
import { MdOutlineSentimentVeryDissatisfied } from "react-icons/md";
import { SEARCH } from '../graphql/queries';
import debounce from 'lodash.debounce'; // Zorg ervoor dat lodash.debounce geïnstalleerd is
import { useTheme } from '@mui/material/styles';
import { ThemeContext } from '../context/ThemeContext';

export default function Search() {

  const theme = useTheme();
  const { isDarkMode } = useContext(ThemeContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    blog: false,
    programma: false,
    portfolio: false,
    services: false,
    tags: false
  });
  const [isSearching, setIsSearching] = useState(false); // dit gaan we gebruiken om de loading spinner te tonen tijdens de debounce

  // Initalize the useLazyQuery hook
  const [getSearchResults, { loading, data, error }] = useLazyQuery(SEARCH, {
    fetchPolicy: "no-cache",  // om altijd de laatste data te krijgen
    skip: !searchQuery && !Object.keys(filters).some(key => filters[key]), // we willen de query niet uitvoeren als de searchQuery leeg is en als er geen filters zijn geselecteerd
    variables: {
      searchTerm: searchQuery,
      includeBlog: filters.blog,
      includeProgramma: filters.programma,
      includePortfolio: filters.portfolio,
      includeServices: filters.services,
      includeTags: filters.tags
    },
  });

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleToggleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.checked
    });
  };

  const isEmpty = data && Object.keys(data).every(key => data[key].length === 0); // Check of de data leeg is

  /* we maken een debounce functie om de search query uit te voeren/vertragen. Let op, we roepen de debounce enkel aan als we een searchQuery of filter wijziging krijgen */
  useEffect(() => {
    const executeSearch = debounce(() => {
      if (searchQuery || Object.keys(filters).some(key => filters[key])) {
        const filterString = Object.keys(filters).filter(key => filters[key]).join(',');
        getSearchResults({
          variables: {
            searchTerm: searchQuery,
            filter: filterString
          }
        });
        console.log(searchQuery, filterString);
        setIsSearching(false); // Zet isSearching uit zodra de query start
      }
    }, 500);
  
    if (searchQuery || Object.keys(filters).some(key => filters[key])) {

      setIsSearching(true); // Activeer spinner zodra de gebruiker begint te typen of filter wijzigt
    }
  
    executeSearch();
  
    // Reset de debounce functie
    return () => {
      executeSearch.cancel();
      setIsSearching(false); // Zorg ervoor dat de spinner stopt als de component unmounts
    };
  }, [searchQuery, filters, getSearchResults]);
  

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Zoek over de ganse website
      </Typography>
      <TextField 
        fullWidth
        label="je zoekterm hier"
        value={searchQuery}
        onChange={handleSearchInputChange}
        variant="outlined"
        sx={{ mb: 3 }}
      />
      <FormGroup row>
        {Object.keys(filters).map((filter) => (
          <FormControlLabel
            control={
              <Switch
                checked={filters[filter]}
                onChange={handleToggleChange}
                name={filter}
              />
            }
            label={filter.charAt(0).toUpperCase() + filter.slice(1)}
            key={filter}
          />
        ))}
      </FormGroup>
      <Box sx={{ mt: 3 }}>
        {(loading || isSearching) && <CircularProgress />}
        {error && <Alert severity='error'>Oeps. Foutje... {error.message}</Alert>}
        {data && (
          <>
            {data.opleidingen?.map((item) => (
              <Typography variant='h6' key={item.opleidingId}>
                {item.opleidingTitel || 'Geen opleidingen gevonden'}
              </Typography>
            ))}
            {data.portfolios?.map((item) => (
              <Typography variant='h6' key={item.portfolioId}>
                {item.portfolioTitel || 'Geen portfolio gevonden'}
              </Typography>
            ))}
            {data.services?.map((item) => (
              <Typography variant='h6' key={item.serviceId}>
                {item.serviceTitel || 'Geen service gevonden'}
              </Typography>
            ))}
            {data.blogposts?.map((item) => (
              <Typography variant='h6' key={item.blogpostId}>
                {item.blogpostTitel || 'Geen blogposts gevonden'}
              </Typography>
            ))}
            {data.vakken?.map((item) => (
              <Typography variant='h6' key={item.vakId}>
                {item.vakTitel || 'Geen vakken gevonden'} 
              </Typography>
            ))}
            {data.instructeurs?.map((item) => (
              <Typography variant='h6' key={item.instructeurId}>
                {item.instructeur_voornaam || 'Geen instructeurs gevonden'} 
              </Typography>
            ))}
            {data.themas?.map((item) => (
              <Typography variant='h6' key={item.themaId}>
                {item.themaTitel || 'Geen thema\'s gevonden'} 
              </Typography>
            ))}
            {data.tags?.map((item) => (
              <Typography variant='h6' key={item.tagId}>
                {item.tagTitel || 'Geen tags gevonden'} 
              </Typography>
            ))}
          </>
        )}
        {isEmpty && (
          <Box sx={{ mt: 4 }}>
            <MdOutlineSentimentVeryDissatisfied  style={{ fontSize: 100, color: isDarkMode ? theme.palette.warning.light : theme.palette.warning.main }} />
            <Typography variant='h6' style={{ color: isDarkMode ? theme.palette.warning.light : theme.palette.warning.main }}>
              We hebben niets gevonden :-/ Probeer iets anders
            </Typography>
          </Box>
        )}  
      </Box>
    </Box>
  );
};
