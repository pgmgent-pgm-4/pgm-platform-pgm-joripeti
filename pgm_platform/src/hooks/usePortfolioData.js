import { useQuery } from '@apollo/client';
import { GET_PORTFOLIOS } from '../queries/portfolioQueries';

export default function usePortfolioData() {
    const { data, isLoading, error } = useQuery(GET_PORTFOLIOS);
    // console.log("portfolios:", data);
    return {
        data: data ? data.portfolios : [],
        isLoading: isLoading,
        error: error
    }
};