import { useQuery } from "@apollo/client";
import { GET_BLOGPOSTS } from "../queries/blogQueries";

export default function useBlogpostData() {
    const { data, isLoading, error } = useQuery(GET_BLOGPOSTS);
    // console.log("blogposts", data);
    return {
        data : data ? data.blogposts : [],
        isLoading: isLoading,
        error: error
    }
};