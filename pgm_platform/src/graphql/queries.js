import { gql } from '@apollo/client';

export const SEARCH = gql`
query Search(
    $searchTerm: String, 
    $includeBlog: Boolean!, 
    $includeServices: Boolean!, 
    $includePortfolio: Boolean!, 
    $includeProgramma: Boolean!
  ) {
    opleidingen(where: {
      OR: [
        { opleidingTitel_contains: $searchTerm },
        { opleidingOmschrijving_contains: $searchTerm }
      ],
      vakken_some: { id_not: null }
    }) @include(if: $includeProgramma) {
      opleidingId
      opleidingTitel
      opleidingOmschrijving
      vakken {
        vakTitel
      }
    }
    portfolios(where: {
      OR: [
        { portfolioTitel_contains: $searchTerm },
        { portfolioOmschrijving_contains: $searchTerm }
      ]
    }) @include(if: $includePortfolio) {
      portfolioId
      portfolioTitel
      portfolioOmschrijving
    }
    services(where: {
      OR: [
        { serviceTitel_contains: $searchTerm },
        { serviceOmschrijving_contains: $searchTerm }
      ]
    }) @include(if: $includeServices) {
      serviceId
      serviceTitel
      serviceOmschrijving
    }
    blogposts(where: {
      OR: [
        { blogpostTitel_contains: $searchTerm },
        { blogpostTekst_contains: $searchTerm }
      ]
    }) @include(if: $includeBlog) {
      blogpostId
      blogpostTitel
      blogpostTekst
    }
  }  
`;
