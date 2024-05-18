import { useMemo } from 'react';
import useBlogpostData from "./useBlogpostData";

// 1 blogpost ophalen
export default function useRandomBlogpost() {
    const { data, isLoading, error } = useBlogpostData();
    const randomBlogpost = useMemo(() => {
        if (data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            return data[randomIndex];
        } 
        return null;
    }, [data]);
    // console.log("randomBlogpost:", randomBlogpost);
    return {
        data: randomBlogpost,
        isLoading: isLoading,
        error: error    
    };
}