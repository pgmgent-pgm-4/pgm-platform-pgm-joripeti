import { gql } from "@apollo/client";

export const GET_PORTFOLIOS = gql`
    query GetPortfolios {
        portfolios {
            id
            portfolioTitel
            portfolioOmschrijving
            portfolioPic
            opleidingen {
                id
                opleidingTitel
                opleidingOmschrijving
            }
        }
    }
`;