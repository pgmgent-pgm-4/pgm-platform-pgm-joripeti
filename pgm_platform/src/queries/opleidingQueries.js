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

export const GET_OPLEIDING = gql`
    query GetOpleiding($id : ID!) {
        opleiding(where: {id: $id}) {
            id
            opleidingTitel
            opleidingOmschrijving
            opleidingEcts
            opleidingPic
        }
    }`;
