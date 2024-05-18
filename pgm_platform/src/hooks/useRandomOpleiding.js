
import { useMemo } from 'react';
import useOpleidingData from "./useOpleidingData";
  
// 1 opleiding ophalen
export default function useRandomOpleiding() {
    const { data, isLoading, error } = useOpleidingData();
    const randomOpleiding = useMemo(() => {
        if (data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            return data[randomIndex];
        }
        return null;
    }, [data]);
    
    return {
        data: randomOpleiding,
        isLoading: isLoading,
        error: error
    };
};

