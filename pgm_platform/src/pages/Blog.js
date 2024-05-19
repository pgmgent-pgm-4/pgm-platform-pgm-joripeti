import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import useBlogpostData from '../hooks/useBlogpostData'
import { useSearchBlog } from '../utils/searchBlog'
import { Box, Grid, TextField, Typography, Card, CardMedia, CardContent, CircularProgress, Avatar } from '@mui/material';


const BlogPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: blogs, isLoading } = useBlogpostData();
    const filteredBlogs = useSearchBlog(searchTerm, blogs);
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const handleBlogpostClick = (id) => {
        // console.log('Blogpost clicked', id);
        // replace id with the actual id of the blogpost
        navigate(`${ROUTES.blogPost.path.replace(':id', id)}`);
    };


    if(isLoading) {
        return <CircularProgress />
    }

    return (
        <Box sx={{ flexGrow: 1, m: 3 }}>
            <TextField 
                fullWidth 
                label="zoek naar een blog" 
                variant="outlined" 
                value={searchTerm}
                onChange={handleOnChange}
                sx={{ mb: 3 }}
            />
            <Grid container spacing={2}>
                {filteredBlogs.map(blog => (
                    <Grid item xs={12} sm={6} md={4} key={blog.id}>
                        <Card 
                          style={{ cursor: 'pointer' }} 
                          onClick={() => handleBlogpostClick(blog.id)}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={blog.imageUrl}
                                alt={blog.blogpostTitel}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {blog.blogpostTitel}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {blog.blogpostTekst}
                                </Typography>
                                <Typography variant="h5" color="text.secondary">
                                   by {blog.auteur.voornaam} {blog.auteur.familienaam}
                                </Typography>
                            <Avatar alt={`${blog.auteur.voornaam} ${blog.auteur.familienaam}`} src={blog.auteur.imageUrl} />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
  };

export default BlogPage;
