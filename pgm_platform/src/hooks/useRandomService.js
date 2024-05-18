import { useMemo } from 'react';
import useServiceData from './useServiceData';

// 1 service ophalen
export default function useRandomService() {
    const { data, isLoading, error } = useServiceData();
    const randomService = useMemo(() => {
        if (data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            return data[randomIndex];
        }
        return null;
    }, [data]);
    // console.log("randomService:", randomService);
    return {
        data: randomService,
        isLoading: isLoading,
        error: error    
    }
 };