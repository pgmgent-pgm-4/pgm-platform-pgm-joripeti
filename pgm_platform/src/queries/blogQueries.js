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

export const GET_BLOGPOST = gql `
    query GetBlogpost($id: ID!) {
        blogpost(where: {id: $id}) {
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