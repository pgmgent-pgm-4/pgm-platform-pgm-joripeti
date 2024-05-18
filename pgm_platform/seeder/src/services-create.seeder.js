import { faker } from '@faker-js/faker';
import client from './graphql_client';

const mutationCreateService = `
mutation createService($serviceTitel: String!, $serviceOmschrijving: String!, $serviceId: String!, $servicePic: String!) {
    createService(data: {
        serviceTitel: $serviceTitel,
        serviceOmschrijving: $serviceOmschrijving,
        serviceId: $serviceId,
        servicePic: $servicePic
    }) {
        id
        serviceTitel
        serviceOmschrijving
        serviceId
        servicePic
    }
}`;

function generateServiceData() {
    return {
        serviceTitel: faker.lorem.words(5),
        serviceOmschrijving: faker.lorem.paragraph(1),
        serviceId: faker.string.uuid(5),
        servicePic: faker.image.urlLoremFlickr({ width: 640, height: 480, category: 'programming' })
    };
}

const createService = async ({ serviceTitel, serviceOmschrijving, serviceId, servicePic }) => {
    try {
        const response = await client.request(mutationCreateService, { serviceTitel, serviceOmschrijving, serviceId, servicePic });
        const { createService } = response;
        if (!createService) {
            throw new Error(`Failed to create the service ${serviceTitel}`);
        }
        console.log(`Service created with title: ${createService.serviceTitel} (ID: ${createService.id})`);
    }
    catch (error) {
        console.error('Error creating service:', error.message || error);
    }
}

const createServices = async (n = 5) => {
    for (let i=0 ; i < n ; i++) {
        await new Promise(resolve => setTimeout(resolve, 300)); // throttle de requests
        createService(generateServiceData()).catch(error => console.error('Error creating service: ', error)); 

    }
}

createServices();