import { faker } from '@faker-js/faker';
import client from './graphql_client';

const mutationCreateAuthor = `
mutation createAuteur($voornaam: String!, $familienaam: String!) {
  createAuteur(data: {voornaam: $voornaam, familienaam: $familienaam}) {
    id
    voornaam
    familienaam
  }
}`;

function generateAuthorData() {
  return {
    voornaam: faker.person.firstName(),
    familienaam: faker.person.lastName(),
  };
}

const createAuthor = async ({ voornaam, familienaam }) => {
  try {
    const response = await client.request(mutationCreateAuthor, { voornaam, familienaam });
    const { createAuteur } = response;

    if (!createAuteur) {
      throw new Error(`Failed to create the author ${voornaam} ${familienaam}`);
    }

    console.log(`Author created with name: ${createAuteur.voornaam} ${createAuteur.familienaam} (ID: ${createAuteur.id})`);
  } catch (error) {
    console.error('Error creating author:', error.message || error);
  }
};

const createAuthors = async (n = 5) => {
  for (let i = 0; i < n; i++) {
    await new Promise(resolve => setTimeout(resolve, 300 * i)).then(() => createAuthor(generateAuthorData()));
  }
};

createAuthors();
