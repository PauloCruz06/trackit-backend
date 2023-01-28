import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let service: UserService;
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{
        provide: UserService,
        useValue: {
          create: jest.fn(),
        },
      }],
    }).compile();

    service = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const body: CreateUserDto = {
      email: faker.internet.email(),
      name: faker.name.firstName(),
      image: faker.internet.url(),
      password: faker.internet.password(),
    };

    it('should create a new user', async () => {
      await controller.create(body);

      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(body);
    });

    it('should throw error an exception', () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      expect(controller.create(body)).rejects.toThrowError();
    });
  });
});
