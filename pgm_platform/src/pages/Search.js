import React, { useState, useEffect, useContext } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Box, Typography, TextField, FormGroup, FormControlLabel, Switch, CircularProgress, Alert } from '@mui/material';
import { MdOutlineSentimentVeryDissatisfied } from "react-icons/md";
import { SEARCH } from '../graphql/queries';
import debounce from 'lodash.debounce'; // Zorg ervoor dat lodash.debounce geïnstalleerd is
import { useTheme } from '@mui/material/styles';
import { ThemeContext } from '../context/ThemeContext';
import { ROUTES } from '../routes/routes';
import { Link } from 'react-router-dom';

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
        label="vul hier je zoekterm in en kies hieronder het onderdeel waarin je wil zoeken"
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
            {data.opleidingen?.length > 0 ? 
            <Typography variant='h5' sx={{ mt: 3 }}>
              Opleidingen
            </Typography> : null}
            {data.opleidingen?.map((item) => (
              <Link to={ROUTES.opleiding.path.replace(':id', item.id)} key={`opleiding-${item.id}`}>
                {console.log(item)}
                <Typography variant='h6' className='search results'>
                  {item.opleidingTitel || 'Geen opleidingen gevonden'}
                </Typography>
              </Link>
            ))}
            {data.portfolios?.length > 0 ? 
             <Typography variant='h5' sx={{ mt: 3 }}>
             Portfolios
           </Typography> : null}
            {data.portfolios?.map((item) => (
              <Typography variant='h6' key={item.portfolioId} className='search results'>
                {item.portfolioTitel || 'Geen portfolio gevonden'}
              </Typography>
            ))}
            {data.services?.length > 0 ? 
             <Typography variant='h5' sx={{ mt: 3 }}>
             Services
           </Typography> : null}
            {data.services?.map((item) => (
              <Typography variant='h6' key={item.serviceId} className='search results'>
                {item.serviceTitel || 'Geen service gevonden'}
              </Typography>
            ))}
            {data.blogposts?.length > 0 ? 
             <Typography variant='h5' sx={{ mt: 3 }}>
             Blogposts
           </Typography> : null}
            {data.blogposts?.map((item) => (
              <Link to={ROUTES.blogPost.path.replace(':id', item.id)} key={`blogpost-${item.id}`}>
                <Typography variant='h6' key={item.blogpostId} className='search results'>
                  {item.blogpostTitel || 'Geen blogposts gevonden'}
                </Typography>
              </Link>
            ))}
            {data.vakken?.length > 0 ? 
             <Typography variant='h5' sx={{ mt: 3 }}>
             Vakken
           </Typography> : null}
            {data.vakken?.map((item) => (
              <Typography variant='h6' key={item.vakId} className='search results'>
                {item.vakTitel || 'Geen vakken gevonden'} 
              </Typography>
            ))}
            {data.instructeurs?.length > 0 ? 
             <Typography variant='h5' sx={{ mt: 3 }}>
             Instructeurs
           </Typography> : null}
            {data.instructeurs?.map((item) => (
              <Typography variant='h6' key={item.instructeurId} className='search results'>
                {item.instructeur_voornaam || 'Geen instructeurs gevonden'} 
              </Typography>
            ))}
            {data.themas?.length > 0 ? 
            <Typography variant='h5' sx={{ mt: 3 }}>
            Themas
            </Typography> : null}
            {data.themas?.map((item) => (
              <Typography variant='h6' key={item.themaId} className='search results'>
                {item.themaTitel || 'Geen thema\'s gevonden'} 
              </Typography>
            ))}
            {data.tags?.length > 0 ? 
              <Typography variant='h5' sx={{ mt: 3 }}>
              Tags
            </Typography> : null}
            {data.tags?.map((item) => (
              <Typography variant='h6' key={item.tagId} className='search results'>
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
