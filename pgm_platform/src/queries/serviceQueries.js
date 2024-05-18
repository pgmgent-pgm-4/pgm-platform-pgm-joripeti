import { gql } from "@apollo/client";

export const GET_SERVICES = gql`
    query GetServices {
        services {
            id
            serviceTitel
            serviceOmschrijving
            servicePic
        }
    } 
`;