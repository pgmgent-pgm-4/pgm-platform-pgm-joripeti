import { gql } from "@apollo/client";

export const GET_CURRICULA_WITH_VAKKEN = gql`
    query GET_CURRICULA {
        curricula {
            id
            curriculumTitel
            curriculumOmschrijving
            opleidingen {
                id
                opleidingTitel
                opleidingOmschrijving
                opleidingEcts
                opleidingPic
                vakken {
                    id
                    vakTitel
                    vakOmschrijving
                    vakPic
                    semester
                    tags {
                        id
                        tagTitel
                        kleur
                    }
                }
            }
        }
    }
`;