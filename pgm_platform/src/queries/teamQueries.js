import { gql } from "@apollo/client";

export const GET_TEAM = gql`
    query GetTeam {
        instructeurs {
            id
            instructeurVoornaam
            instructeurFamilienaam
            instructeurBio
            instructeurPic
            opleidingen {
                id
                opleidingTitel
            }
            vakken {
                id
                vakTitel
            }
        }
    }
`;