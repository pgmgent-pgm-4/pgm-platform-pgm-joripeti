import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchBlogpost from '../hooks/useFetchBlogpost';
import { CircularProgress, Typography, Box, Avatar } from '@mui/material';
import { Helmet } from 'react-helmet';

export default function BlogPost() {

  // get id from query string
  const searchParams = useParams(); // destructuring the id from the query string as an object (not array) 
  const blogPostId = searchParams.id; // get the id from the object
  // fetch the blogpost with the id from the query string
  const { blogpost, isLoading, error } = useFetchBlogpost(blogPostId);

  if(isLoading) {
    return <CircularProgress />;
  }

  if(error) {
    return <Typography color="error">error loading this post: {error.message}</Typography>;
  }

  // display the blogpost
  return (
    <>
    {blogpost && (  
      <Helmet>
        <title>{blogpost.blogpostTitel}</title>
        <meta name="description" content={blogpost.blogpostTekst.length > 150 ? blogpost.blogpostTekst.substr(0, 147) + '...' : blogpost.blogpostTekst} />
        <meta name="keywords" content="blogposts, SMART, education, IT, programmeren" />
      </Helmet>
    )}
    <Box sx={{ p: 3 }}>
      {blogpost && (
        <>
          <Typography variant="h1" gutterBottom>
            {blogpost.blogpostTitel}
          </Typography>
          <img src={blogpost.imageUrl} alt={blogpost.blogpostTitel} style={{ width: '100%', height: 'auto' }} />
          <Typography variant="body1" gutterBottom>
            {blogpost.blogpostTekst}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            by {blogpost.auteur.voornaam} {blogpost.auteur.familienaam}
          </Typography>
          <Avatar alt={`${blogpost.auteur.voornaam} ${blogpost.auteur.familienaam}`} src={blogpost.auteur.imageUrl} />
        </>
      )}
    </Box>
    </>
  );
};

