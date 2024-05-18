import { useMemo } from 'react';
import usePortfolioData from "./usePortfolioData";

// 1 portfolio ophalen
export default function useRandomPortfolio() {
    const { data, isLoading, error } = usePortfolioData();
    const randomPortfolio = useMemo(() => {
        if (data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            return data[randomIndex];
        }
        return null;
    }, [data]);
    // console.log("randomPortfolio:", randomPortfolio);
    return {
        data: randomPortfolio,
        isLoading: isLoading,
        error: error
    };
}   