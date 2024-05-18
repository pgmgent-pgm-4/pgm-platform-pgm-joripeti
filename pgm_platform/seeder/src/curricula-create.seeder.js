// curricula seeder
// geen fetchen van Ids van relaties - werkt toch niet

import { faker } from '@faker-js/faker';
import client from './graphql_client';

// maak mutation aan voor het aanmaken van een curriculum
const createMutationCurriculum = `
mutation createCurriculum($curriculumTitel: String!, $curriculumOmschrijving: String!, $opleidingIds: [OpleidingWhereUniqueInput!]) {
    createCurriculum(data: {
        curriculumTitel: $curriculumTitel,
        curriculumOmschrijving: $curriculumOmschrijving,
        opleidingen: {connect: $opleidingIds}
    }) {
        id
        curriculumTitel
        curriculumOmschrijving
    }
}`;

// Generate random data for a curriculum
const generateCurriculumData = (opleidingIds) => {
    return {
        curriculumTitel: faker.lorem.words(3),
        curriculumOmschrijving: faker.lorem.paragraph(1),
        opleidingIds
    };
};

// maak een curriculum aan
const createCurriculum = async ({ curriculumTitel, curriculumOmschrijving, opleidingIds }) => {
    try {
        const response = await client.request(createMutationCurriculum, { curriculumTitel, curriculumOmschrijving, opleidingIds });
        const { createCurriculum } = response;
        if(!createCurriculum) {
            throw new Error(`Failed to create the curriculum ${curriculumTitel}`);
        }
        console.log(`Curriculum created with title: ${createCurriculum.curriculumTitel} (ID: ${createCurriculum.id})`);
    } catch (error) {
        console.error('Error creating curriculum:', error.message || error);
    }
};

// maak een aantal curricula aan met een interval van 300ms
const createCurricula = async (n=5, opleidingIds) => {
    for (let i=0 ; i<n ; i++) {
        await new Promise(resolve => setTimeout(resolve, 300)); // throttle de requests
        createCurriculum(generateCurriculumData(opleidingIds)).catch(error => console.error('Error creating curriculum: ', error));
    }
};

createCurricula();