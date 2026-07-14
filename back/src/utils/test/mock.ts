import { fakerFR as faker } from '@faker-js/faker';
import { user } from "../../../prisma/generated/prisma/client"
import { jest } from '@jest/globals'

export const prismaMock = {
  user: {
    findUnique: jest.fn() as jest.MockedFunction<any>,
    findMany: jest.fn() as jest.MockedFunction<any>,
    create: jest.fn() as jest.MockedFunction<any>,
    update: jest.fn() as jest.MockedFunction<any>,
    delete: jest.fn() as jest.MockedFunction<any>,
  },
};

export const mockUser: user & { profile: any } = {
  id: faker.number.int(),
  email: faker.internet.email(),
  password: faker.internet.password(), 
  is_validated: faker.datatype.boolean(),
  role: faker.helpers.arrayElement(['benevole', 'organisateur']),
  created_at: new Date(),
  updated_at: new Date(),
  

  profile: {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    
    adress: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      postalCode: faker.location.zipCode(),
    }
  },
};

export const mockPartialUser: Partial<user> = {
  email : faker.internet.email(),
  password: faker.internet.password(),
};

export const mockAllUser = (length: number): user[] => {
  return Array.from({ length }, (): user => {
    return mockUser;
  });
};
