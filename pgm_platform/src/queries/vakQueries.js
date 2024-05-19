import { gql } from '@apollo/client';

export const GET_VAKKEN = gql`{
    query GetVakken {
        vakken {
            id
            vakTitel
            vakOmschrijving
            vakPic
            opleidingen {
                id
                opleidingTitel
                opleidingOmschrijving
                opleidingEcts
                opleidingPic
            }
            instructeurs {
                id
                instructeurVoornaam
                instructeurFamilienaam
                instructeurBio
                instructeurPic
            }
            tags {
                id
                tagTitel
            }
        }
    }
`;