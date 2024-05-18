import { faker } from '@faker-js/faker';
import client from './graphql_client';

const mutationCreateBlogpost = `
mutation createBlogpost(
    $blogpostId: String!, 
    $blogpostTitel: String!, 
    $blogpostTekst: String!, 
    $auteurId: ID!, 
    $publicatieDatum: String!, 
    $leestijd: Int!, 
    $imageUrl: String!,
    $themaIds: [ThemaWhereUniqueInput!]) {
    createBlogpost(data: {
        blogpostId: $blogpostId,
        blogpostTitel: $blogpostTitel,
        blogpostTekst: $blogpostTekst,
        auteur: {connect: {id: $auteurId}},
        publicatieDatum: $publicatieDatum,
        leestijd: $leestijd,
        imageUrl: $imageUrl,
        themas: {connect: $themaIds} 
        })  {
            id
            blogpostTitel
            blogpostTekst
            auteur {
                id
                voornaam
                familienaam
                imageUrl
            }
            publicatieDatum
            leestijd
            imageUrl
            themas {
                id
                themaTitel
                themaTekst
            }
        }
    }`;

// const allAuteurIds = [1,2,3,4,5]; // array of author IDs

async function fetchAllAuteurIds() {
    try {
        const query = `{ auteurs { id } }`;
        const response = await client.request(query);
        return response.auteurs.map(auteur => auteur.id);
    } catch (error) {
        console.error("Failed to fetch author IDs:", error);
        return [];
    }
}


// haal alle auteur IDs op en haal de eerste uit de array
function getRandomAuteurId(allAuteurIds) {
    const auteurId = faker.helpers.shuffle(allAuteurIds)[0]; 
    console.log("auteurId :", auteurId); 
    return auteurId;
}

function generateBlogpostData(auteurId, themaIds) {
    return {
        blogpostId: faker.string.uuid(),
        blogpostTitel: faker.lorem.sentence(),
        blogpostTekst: faker.lorem.paragraph(3),
        auteurId: auteurId,
        publicatieDatum: faker.date.recent(),
        leestijd: faker.number.int({ min: 1, max: 10 }),
        imageUrl: faker.image.urlLoremFlickr({ width: 640, height: 480, category: 'programming'}),
        themaIds: themaIds 
    };
}

const createBlogpost = async ({ blogpostId, blogpostTitel, blogpostTekst, auteurId, publicatieDatum, leestijd, imageUrl, themaIds }) => {
    console.log(auteurId);
    try {
      const response = await client.request(mutationCreateBlogpost, { blogpostId, blogpostTitel, blogpostTekst, auteurId, publicatieDatum, leestijd, imageUrl, themaIds });
      const { createBlogpost } = response;
  
      if (!createBlogpost) {
        throw new Error(`Failed to create the blogpost ${blogpostTitel}`);
      }
  
      console.log(`Blogpost created with title: ${createBlogpost.blogpostTitel} (ID: ${createBlogpost.blogpostId})`);
    } catch (error) {
      console.error('Error creating blogpost:', error.message || error);
    }
  };

  async function createBlogposts() {
    const allAuteurIds = await fetchAllAuteurIds();
    const themaIds = [/* array of thema IDs */];

    for (let i = 0; i < 5; i++) {
        const auteurId = getRandomAuteurId(allAuteurIds);  // Generate a random author ID for each blog post
        const blogpostData = generateBlogpostData(auteurId, themaIds);
        await createBlogpost(blogpostData);
    }
}

createBlogposts();

