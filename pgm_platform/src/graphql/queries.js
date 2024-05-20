import { gql } from '@apollo/client';

export const SEARCH = gql`
query Search(
    $searchTerm: String, 
    $includeBlog: Boolean!, 
    $includeServices: Boolean!, 
    $includePortfolio: Boolean!, 
    $includeProgramma: Boolean!,
    $includeTags: Boolean!
  ) {
    opleidingen(where: {
      OR: [
        { opleidingTitel_contains: $searchTerm },
        { opleidingOmschrijving_contains: $searchTerm }
      ],
      vakken_some: { id_not: null }
    }) @include(if: $includeProgramma) {
      id
      opleidingTitel
      opleidingOmschrijving
      vakken {
        id
        vakTitel
        vakOmschrijving
      }
    }
    portfolios(where: {
      OR: [
        { portfolioTitel_contains: $searchTerm },
        { portfolioOmschrijving_contains: $searchTerm }
      ]
    }) @include(if: $includePortfolio) {
      id
      portfolioTitel
      portfolioOmschrijving
    }
    services(where: {
      OR: [
        { serviceTitel_contains: $searchTerm },
        { serviceOmschrijving_contains: $searchTerm }
      ]
    }) @include(if: $includeServices) {
      id
      serviceTitel
      serviceOmschrijving
    }
    blogposts(where: {
      OR: [
        { blogpostTitel_contains: $searchTerm },
        { blogpostTekst_contains: $searchTerm }
      ]
    }) @include(if: $includeBlog) {
      id
      blogpostTitel
      blogpostTekst
    }
    tags(where: {
      OR: [
        { tagTitel_contains: $searchTerm },
      ]
    }) @include(if: $includeTags) {
      id
      tagTitel
    }
  }  
`;
