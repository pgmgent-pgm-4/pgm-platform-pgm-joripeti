import { gql } from "@apollo/client";

export const GET_BLOGPOSTS = gql `
    query GetBlogposts {
        blogposts {
            id
            blogpostTitel
            blogpostTekst
            imageUrl
            publicatieDatum
            leestijd
            themas {
                id
                themaTitel
            }
            auteur {
                id
                voornaam
                familienaam
                imageUrl
            }
        }
    }
`;