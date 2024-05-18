// met deze seeder voor instructeurs probeer ik de ids van opleidingen en vakken op te halen en deze random te matchen met instructeurs ; het ophalen lukt, het matchen nog niet

import { faker } from '@faker-js/faker';
import client from './graphql_client';

// Query for fetching IDs from the database
const opleidingenQuery = `
query {
    opleidingen {
        id
    }
}`;

const vakkenQuery = `
query {
    vakken {
        id
    }
}`;

async function fetchIds(query) {
    try {
        const response = await client.request(query);
        console.log("GraphQL Response:", JSON.stringify(response, null, 2)); // Log the full response

        // Determine which key to use based on the query content.
        const key = query.includes('opleidingen') ? 'opleidingen' : 'vakken';
        const items = response.data && response.data[key] ? response.data[key] : []; // Safely check if data exists ; opmerking: we krijgen data met daarin een key opleidingen of vakken en daarbinnen een array van objecten!

        return items.map(item => item.id);  // Map over the items to return only the IDs
    } catch (error) {
        console.error('Error fetching IDs:', error);
        return [];  // Return an empty array if there's an error
    }
}



// Mutation for creating an instructeur
const mutationCreateInstructeur = `
mutation createInstructeur($instructeurVoornaam: String!, $instructeurFamilienaam: String!, $instructeurBio: String!, $instructeurPic: String!, $opleidingIds: [OpleidingWhereUniqueInput!], $vakIds: [VakWhereUniqueInput!]) {
    createInstructeur(data: {
        instructeurVoornaam: $instructeurVoornaam,
        instructeurFamilienaam: $instructeurFamilienaam,
        instructeurBio: $instructeurBio,
        instructeurPic: $instructeurPic,
        opleidingen: {connect: $opleidingIds},
        vakken: {connect: $vakIds}
    }) {
        id
        instructeurVoornaam
        instructeurFamilienaam
        instructeurPic
    }
}`;

// Generate random data for an instructeur
function generateInstructeurData(opleidingIds, vakIds) {
    const shuffledOpleidingenIds = opleidingIds.length ? faker.helpers.shuffle(opleidingIds).slice(0, faker.number.int({ min: 1, max: opleidingIds.length })) : [];
    const shuffledVakIds = vakIds.length ? faker.helpers.shuffle(vakIds).slice(0, faker.number.int({ min: 1, max: vakIds.length })) : [];

    return {
        instructeurVoornaam: faker.person.firstName(),
        instructeurFamilienaam: faker.person.lastName(),
        instructeurBio: faker.lorem.sentence(),
        instructeurPic: faker.image.avatar(),
        opleidingIds: shuffledOpleidingenIds.map(id => ({ id })),
        vakIds: shuffledVakIds.map(id => ({ id }))
    };
}


// Create an instructeur with randomly linked opleidingen and vakken
const createInstructeur = async (data) => {
    try {
        const response = await client.request(mutationCreateInstructeur, data);
        const { createInstructeur } = response;
        if (!createInstructeur) {
            throw new Error(`Failed to create the instructeur ${data.instructeurVoornaam} ${data.instructeurFamilienaam}`);
        }
        console.log(`Instructeur created with name: ${createInstructeur.instructeurVoornaam} ${createInstructeur.instructeurFamilienaam} (ID: ${createInstructeur.id})`);
    } catch (error) {
        console.error('Error creating instructeur:', error.message || error);
    }
};

// Main function to execute the creation process
const createInstructeurs = async () => {
    const opleidingIds = await fetchIds(opleidingenQuery);  // This might be an empty array
    const vakIds = await fetchIds(vakkenQuery);  // This might have IDs

    for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 300)); // Throttle requests
        const instructeurData = generateInstructeurData(opleidingIds, vakIds);
        createInstructeur(instructeurData).catch(error => console.error('Error creating instructeur: ', error));
    }
};

createInstructeurs();