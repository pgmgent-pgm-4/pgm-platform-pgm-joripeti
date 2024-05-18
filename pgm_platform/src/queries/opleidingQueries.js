import { gql } from "@apollo/client";

export const GET_OPLEIDINGEN = gql`
    query GetOpleidingen {
        opleidingen {
            id
            opleidingTitel
            opleidingOmschrijving
            opleidingEcts
            opleidingPic
            instructeurs {
                id
                instructeurVoornaam
                instructeurFamilienaam
                instructeurBio
                instructeurPic
            }
        }
    }
`;

