import { useQuery } from "@apollo/client";
import { GET_SERVICES } from "../queries/serviceQueries";

export default function useServiceData() {
    const { data, isLoading, error } = useQuery(GET_SERVICES);

    return {
        data: data? data.services : [],
        isLoading: isLoading,
        error: error
    }
};
