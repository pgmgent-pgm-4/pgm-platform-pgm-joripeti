import { useMemo } from 'react';

export const useSearchBlog = (searchTerm, blogs) => {
    return useMemo(() => {
        if (!blogs || !Array.isArray(blogs)) {
            console.error('Expected an array but received:', blogs);
            return [];
        }

        return blogs.filter(blog =>
            (blog.blogpostTitel && blog.blogpostTitel.toLowerCase().includes(searchTerm.toLowerCase())) || 
            (blog.blogpostTekst && blog.blogpostTekst.toLowerCase().includes(searchTerm.toLowerCase())) || 
            (blog.auteur && blog.auteur.voornaam && blog.auteur.voornaam.toLowerCase().includes(searchTerm.toLowerCase())) || 
            (blog.auteur && blog.auteur.familienaam && blog.auteur.familienaam.toLowerCase().includes(searchTerm.toLowerCase())) || 
            (blog.themas && blog.themas.some(thema => thema.themaTitel && thema.themaTitel.toLowerCase().includes(searchTerm.toLowerCase()))) || 
            (blog.themas && blog.themas.some(thema => thema.themaTekst && thema.themaTekst.toLowerCase().includes(searchTerm.toLowerCase())))
        );
    }, [searchTerm, blogs]);
};
