// Desc: Create a context to provide blog data to the app (to display the number of blog posts in the header)

import React, { createContext, useContext } from 'react';
import useBlogpostData from '../hooks/useBlogpostData';

// create the BlogContext outside of any function - top level
export const BlogContext = createContext();

// Define the provider as a top-level exported function
export const BlogProvider = ({ children }) => {
    const { data: blogs, loading, error } = useBlogpostData();
    // console.log("blogs:", blogs);
    const blogCount = blogs ? blogs.length : 0;

    return (
        <BlogContext.Provider value={{ blogCount, loading, error }}>
            {children}
        </BlogContext.Provider>
    );
};

// Define a custom hook to use the context, also top level
export const useBlogData = () => {
    const context = useContext(BlogContext);
    if (context === undefined) {
        throw new Error('useBlogData must be used within a BlogProvider');
    }
    return context;
};
