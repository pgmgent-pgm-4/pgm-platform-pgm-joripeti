import { faker } from '@faker-js/faker';
import client from './graphql_client';

// maak mutation aan voor het aanmaken van een vak
const mutationCreateVak = `
mutation createVak($vakTitel: String!, $vakOmschrijving: String!, $vakPic: String!, $opleidingIds: [OpleidingWhereUniqueInput!], $instructeurIds: [InstructeurWhereUniqueInput!], $tagIds: [TagWhereUniqueInput!]) {
    createVak(data: {
        vakTitel: $vakTitel,
        vakOmschrijving: $vakOmschrijving,
        vakPic: $vakPic,
        opleidingen: {connect: $opleidingIds},
        instructeurs: {connect: $instructeurIds},
        tags: {connect: $tagIds}
    }) {
        id
        vakTitel
        vakOmschrijving
        vakPic
        }
    }
`

// genereer data voor een vak
function generateVakData(opleidingIds, instructeurIds, tagIds) {
    return {
        vakTitel: faker.lorem.words(5),
        vakOmschrijving: faker.lorem.paragraph(1),
        vakPic: faker.image.urlLoremFlickr({ width: 640, height: 480, category: 'programming' }),
        opleidingIds,
        instructeurIds,
        tagIds
    };
}

// maak een vak aan
const  createVak = async ({ vakTitel, vakOmschrijving, vakPic, opleidingIds, instructeurIds, tagIds }) => {
    try {
        const response = await client.request(mutationCreateVak, { vakTitel, vakOmschrijving, vakPic, opleidingIds, instructeurIds, tagIds });
        const { createVak } = response;
        if(!createVak) {
            throw new Error(`Failed to create the vak ${vakTitel}`);
        }
        console.log(`Vak created with title: ${createVak.vakTitel} (ID: ${createVak.id})`);
    } catch (error) {
        console.error('Error creating vak:', error.message || error);
    }
}

// maak een aantal vakken aan met een interval van 300ms
const createVakken = async (n=5, opleidingIds, instructeurIds, tagIds) => {
    for (let i=0 ; i<n ; i++) {
        await new Promise(resolve => setTimeout(resolve, 300)); // throttle de requests
        createVak(generateVakData(opleidingIds, instructeurIds, tagIds)).catch(error => console.error('Error creating vak: ', error));
    }
}

createVakken();
