import { useQuery } from '@apollo/client';
import { GET_BLOGPOST } from '../queries/blogQueries';

export default function useFetchBlogpost(id) {
    const { data, isLoading, error } = useQuery(GET_BLOGPOST, { 
      skip: !id,
      variables: { id } 
    });
  return {
    blogpost: data ? data.blogpost : null,
    isLoading,
    error
  };
}
