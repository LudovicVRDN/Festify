import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { AdressService } from 'src/adress/adress.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { PrismaService } from '../../prisma/prisma.service'; 
import { user } from '../../prisma/generated/prisma/client'; 
import { mockUser, mockAllUser, prismaMock } from '../utils/test/mock'; 

describe('The UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        
        {
          provide: JwtService, 
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
       
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => 'mock-value'),
          },
        },
  
        {
          provide: AdressService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = await module.get(UserService);

    prismaMock.user.findUnique.mockClear();
    prismaMock.user.findMany.mockClear();
    prismaMock.user.create.mockClear();
    prismaMock.user.delete.mockClear();
  });

  describe('when the findOne function is called', () => {
    describe('and the findUnique method returns the user', () => {
      let userInstance: user;

      beforeEach(() => {
        userInstance = mockUser as any;
        prismaMock.user.findUnique.mockResolvedValue(userInstance);
      });

      it('should return the user', async () => {
        const result = await userService.findOne(userInstance.id);
        expect(result).toBe(userInstance);
        expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
          where: { id: userInstance.id },
        });
      });

      it('should return null if user id does not exist', async () => {
        prismaMock.user.findUnique.mockResolvedValue(null);
        const result = await userService.findOne(99999);
        expect(result).toBeNull();
      });
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const multiusers = mockAllUser(3);
      prismaMock.user.findMany.mockResolvedValue(multiusers);

      const result = await userService.findAll();
      expect(result).toEqual(multiusers);
      expect(prismaMock.user.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no users', async () => {
      prismaMock.user.findMany.mockResolvedValue([]);
      const result = await userService.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('when the create function is called', () => {
    it('should return the created user', async () => {
      const userInstance = mockUser;
      prismaMock.user.create.mockResolvedValue(userInstance);

      const result = await userService.create(userInstance as any);
      expect(result).toBe(userInstance);
      expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the delete function is called', () => {
    it('should return the deleted user', async () => {
      const userInstance = mockUser;
      prismaMock.user.delete.mockResolvedValue(userInstance);

      const result = await userService.remove(userInstance.id);
      expect(result).toBeUndefined();
      expect(prismaMock.user.delete).toHaveBeenCalledTimes(1);
    });
  });
});