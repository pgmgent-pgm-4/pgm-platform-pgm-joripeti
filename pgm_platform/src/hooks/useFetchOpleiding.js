import { useQuery } from '@apollo/client';
import { GET_OPLEIDING } from '../queries/opleidingQueries';

export default function useFetchBlogpost(id) {
    const { data, isLoading, error } = useQuery(GET_OPLEIDING, { 
      skip: !id,
      variables: { id } 
    });
  return {
    opleiding: data ? data.opleiding : null,
    isLoading,
    error
  };
}
