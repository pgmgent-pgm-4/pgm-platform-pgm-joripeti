import { useQuery } from "@apollo/client";
import { GET_VAKKEN } from "../queries/vakQueries";

export default function useVakData() {
    const { data, isLoading, error } = useQuery(GET_VAKKEN);
    console.log("vakken:", data);
    return {
        data: data ? data.vakken : [],
        isLoading: isLoading,
        error: error
    }
};