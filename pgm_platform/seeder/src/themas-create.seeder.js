import { faker } from '@faker-js/faker';
import client from './graphql_client';

const mutationCreateThema = `
mutation createThema($themaTitel: String!, $themaTekst: String!, $themaId: String!, $blogpostIds: [BlogpostWhereUniqueInput!]) {
  createThema(data: {themaTitel: $themaTitel, themaTekst: $themaTekst, themaId: $themaId, blogposts: {connect: $blogpostIds}
}) {
    id
    themaTitel
    themaTekst
    themaId
  }
}`;

function generateThemaData(blogpostIds) {
  return {
    themaTitel: faker.lorem.words(1),
    themaTekst: faker.lorem.paragraph(1),
    themaId: faker.string.uuid(5),
    blogpostIds: blogpostIds ? blogpostIds.map(id => ({ id })) : []
  };
}

const createThema = async ({ themaTitel, themaTekst, themaId, blogpostIds }) => {
  try {
    const response = await client.request(mutationCreateThema, { themaTitel, themaTekst, themaId, blogpostIds });
    const { createThema } = response;

    if (!createThema) {
      throw new Error(`Failed to create the thema ${themaTitel}`);
    }

    console.log(`Thema created with title: ${createThema.themaTitel} (ID: ${createThema.id})`);
  } catch (error) {
    console.error('Error creating thema:', error.message || error);
  }
};

const createThemas = async (n = 5, blogpostIds) => {
  for (let i = 0; i < n; i++) {
    const themaData = generateThemaData(blogpostIds);
    await new Promise(resolve => setTimeout(resolve, 300 * i)).then(() => createThema(themaData));
  }
};

createThemas();