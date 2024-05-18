// portfolios seeder

import { faker } from '@faker-js/faker';
import client from './graphql_client';

// maak mutation aan voor het aanmaken van een portfolio
const createMutationPortfolio = `
mutation createPortfolio($portfolioTitel: String!, $portfolioOmschrijving: String!, $portfolioPic: String!, $opleidingIds: [OpleidingWhereUniqueInput!]) {
    createPortfolio(data: {
        portfolioTitel: $portfolioTitel,
        portfolioOmschrijving: $portfolioOmschrijving,
        portfolioPic: $portfolioPic,
        opleidingen: {connect: $opleidingIds}
    }) {
        id
        portfolioTitel
        portfolioOmschrijving
        portfolioPic
    }
}`;

// Query for fetching IDs from the database
const opleidingenQuery = `
query {
    opleidingen {
        id
    }
}`;

// fetch IDs from the database
async function fetchIds(query) {
    try {
        const response = await client.request(query);
        console.log("GraphQL Response:", JSON.stringify(response, null, 2)); // Log the full response

        if (!response || !response.data) {
            console.log('No data received in response:', response);
            return [];
        }

        const items = response.data.opleidingen || [];
        console.log('Items fetched:', items);  // Check what items are being returned
        return items.map(item => item.id);  // Map over the items to return only the IDs
    } catch (error) {
        console.error('Error fetching IDs:', error);
        console.error('Detailed error:', JSON.stringify(error, null, 2));
        return [];  // Return an empty array if there's an error
    }
}


fetchIds(opleidingenQuery);

// Generate random data for a portfolio
function generatePortfolioData(opleidingIds) {
    return {
        portfolioTitel: faker.lorem.words(5),
        portfolioOmschrijving: faker.lorem.paragraph(1),
        portfolioPic: faker.image.urlLoremFlickr({ width: 640, height: 480, category: 'programming' }),
        opleidingIds
    };
}

// maak een portfolio aan
const createPortfolio = async ({ portfolioTitel, portfolioOmschrijving, portfolioPic, opleidingIds }) => {
    try {
        const response = await client.request(createMutationPortfolio, { portfolioTitel, portfolioOmschrijving, portfolioPic, opleidingIds });
        const { createPortfolio } = response;
        if (!createPortfolio) {
            throw new Error(`Failed to create the portfolio ${portfolioTitel}`);
        }
        console.log(`Portfolio created with title: ${createPortfolio.portfolioTitel} (ID: ${createPortfolio.id})`);
    } catch (error) {
        console.error('Error creating portfolio:', error.message || error);
    }
}

// maak een aantal portfolio's aan met een interval van 300ms
const createPortfolios = async (n = 5) => {
    const opleidingIds = await fetchIds(opleidingenQuery);
    for (let i = 0; i < n; i++) {
        await new Promise(resolve => setTimeout(resolve, 300)); // throttle de requests
        createPortfolio(generatePortfolioData(opleidingIds)).catch(error => console.error('Error creating portfolio: ', error));
    }
}

createPortfolios();