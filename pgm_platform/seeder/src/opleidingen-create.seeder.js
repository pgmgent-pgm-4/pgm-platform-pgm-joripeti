// seeder voor opleidingen
// we fetchen de Ids, maar we kunnen ze nog niet random matchen met nieuwe opleidingen

import { faker } from '@faker-js/faker';
import client from './graphql_client';

// maak mutation aan voor het aanmaken van een opleiding
const mutationCreateOpleiding = `
mutation createOpleiding($opleidingTitel: String!, $opleidingOmschrijving: String!, $opleidingEcts: Int!, $opleidingPic: String!, $vakIds: [VakWhereUniqueInput!], $instructeurIds: [InstructeurWhereUniqueInput!], $curriculumIds: [CurriculumWhereUniqueInput!], $portfolioIds: [PortfolioWhereUniqueInput!]) {
    createOpleiding(data: {
        opleidingTitel: $opleidingTitel,
        opleidingOmschrijving: $opleidingOmschrijving,
        opleidingEcts: $opleidingEcts,
        opleidingPic: $opleidingPic,
        vakken: {connect: $vakIds},
        instructeurs: {connect: $instructeurIds},
        curricula: {connect: $curriculumIds},
        portfolios: {connect: $portfolioIds}
    }) {
        id
        opleidingTitel
        opleidingOmschrijving
        opleidingEcts
        opleidingPic
    }
}`;

// Query for fetching IDs from the database
const vakkenQuery = `
query {
    vakken {
        id
    }
}`;

const instructeursQuery = `
query {
    instructeurs {
        id
    }
}`;

const curriculaQuery = `
query {
    curricula {
        id
    }
}`;

const portfoliosQuery = `
query {
    portfolios {
        id
    }
}`;

// fetch IDs from the database
async function fetchIds(query) {
    try {
        const response = await client.request(query);
        // console.log("GraphQL Response:", JSON.stringify(response, null, 2)); // Log the full response

        // Determine which key to use based on the query content.
        const key = query.includes('vakken') ? 'vakken' : query.includes('instructeurs') ? 'instructeurs' : query.includes('curricula') ? 'curricula' : 'portfolios';
        const items = response.data && response.data[key] ? response.data[key] : []; // Safely check if data exists ; opmerking: we krijgen data met daarin een key opleidingen of vakken en daarbinnen een array van objecten!
        return items.map(item => item.id);  // Map over the items to return only the IDs
        
    } catch (error) {
        console.error('Error fetching IDs:', error);
        return [];  // Return an empty array if there's an error
    }
};

async function fetchAllIds() {
    try {
        const vakIds = await fetchIds(vakkenQuery);
        const instructeurIds = await fetchIds(instructeursQuery);
        const curriculumIds = await fetchIds(curriculaQuery);
        const portfolioIds = await fetchIds(portfoliosQuery);
        // console.log('vakIds:', vakIds, 'instructeurIds:', instructeurIds, 'curriculumIds:', curriculumIds, 'portfolioIds:', portfolioIds);
        return { vakIds, instructeurIds, curriculumIds, portfolioIds };
    } catch (error) {
        console.error('Error fetching all IDs:', error);
        return { vakIds: [], instructeurIds: [], curriculumIds: [], portfolioIds: [] };
    }
};


// Generate random data voor een opleiding
function generateOpleidingData(vakIds, instructeurIds, curriculumIds, portfolioIds) {
    // Log the IDs received to verify
    // console.log('Received IDs:', { vakIds, instructeurIds, curriculumIds, portfolioIds });

    // Shuffle and slice the IDs
    const shuffledVakIds = vakIds.length ? faker.helpers.shuffle(vakIds).slice(0, faker.number.int({ min: 1, max: vakIds.length })) : [];
    const shuffledInstructeurIds = instructeurIds.length ? faker.helpers.shuffle(instructeurIds).slice(0, faker.number.int({ min: 1, max: instructeurIds.length })) : [];
    const shuffledCurriculumIds = curriculumIds.length ? faker.helpers.shuffle(curriculumIds).slice(0, faker.number.int({ min: 1, max: curriculumIds.length })) : [];
    const shuffledPortfolioIds = portfolioIds.length ? faker.helpers.shuffle(portfolioIds).slice(0, faker.number.int({ min: 1, max: portfolioIds.length })) : [];

    // Return generated data
    return {
        opleidingTitel: faker.lorem.words(5),
        opleidingOmschrijving: faker.lorem.paragraph(1),
        opleidingEcts: faker.number.int({ min: 1, max: 10 }),
        opleidingPic: faker.image.urlLoremFlickr({width: 640}, {height: 480}, {category: 'education' }),
        vakIds: shuffledVakIds.map(id => ({ id })),
        instructeurIds: shuffledInstructeurIds.map(id => ({ id })),
        curriculumIds: shuffledCurriculumIds.map(id => ({ id })),
        portfolioIds: shuffledPortfolioIds.map(id => ({ id }))
    };
}


// async function main() {
//     // Fetch all IDs correctly awaited
//     const { vakIds, instructeurIds, curriculumIds, portfolioIds } = await fetchAllIds();

//     // Log to ensure IDs are fetched correctly
//     console.log('Fetched IDs:', { vakIds, instructeurIds, curriculumIds, portfolioIds });

//     // Generate opleiding data using the fetched IDs
//     const opleidingData = generateOpleidingData(vakIds, instructeurIds, curriculumIds, portfolioIds);
//     console.log("Generated Opleiding Data:", opleidingData);

//     // Assuming createOpleiding is another function to handle the creation process using generated data
//     // createOpleiding(opleidingData); // Uncomment or modify this line as needed for your application logic
// }

// main();





// Create opleiding
const createOpleiding = async (data) => {
    try {
        const response = await client.request(mutationCreateOpleiding, data);
        const { createOpleiding } = response;
        if (!createOpleiding) {
            throw new Error(`Failed to create the opleiding ${data.opleidingTitel}`);
        }
        console.log(`Opleiding created with title: ${createOpleiding.opleidingTitel} (ID: ${createOpleiding.id})`);
    } catch (error) {
        console.error('Error creating opleiding:', error.message || error);
    }
};


// Create opleidingen
const createOpleidingen = async (n = 5) => {
    const { vakIds, instructeurIds, curriculumIds, portfolioIds } = await fetchAllIds();
    for (let i = 0; i < n; i++) {
        await new Promise(resolve => setTimeout(resolve, 300)); // throttle de requests
        createOpleiding(generateOpleidingData(vakIds, instructeurIds, curriculumIds, portfolioIds)).catch(error => console.error('Error creating opleiding: ', error));
    }
};

createOpleidingen();
