import { useQuery } from "@apollo/client";
import { GET_OPLEIDINGEN } from "../queries/opleidingQueries";

export default function useOpleidingData() {
    const { data, isLoading, error } = useQuery(GET_OPLEIDINGEN);
    // console.log("Data:", data);
    // console.log("Loading:", isLoading);
    // console.log("Error:", error);
    return { 
        data: data ? data.opleidingen : [], 
        isLoading: isLoading, 
        error: error
    }
};

