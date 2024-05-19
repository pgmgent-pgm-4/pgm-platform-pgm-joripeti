import { useQuery } from "@apollo/client";
import { GET_CURRICULA_WITH_VAKKEN } from "../queries/curriculaQueries";

export default function useCurriculaData() {
    const { data, isLoading, error } = useQuery(GET_CURRICULA_WITH_VAKKEN);
    // console.log("curricula array:", data);
    return {
        data: data ? data.curricula : [],
        isLoading: isLoading,
        error: error
    }
};