import { Test, TestingModule } from '@nestjs/testing';
import { SignupService, SignupServiceToken } from './SignupService';
import {
  SignupServiceProvider,
  ValidateUserInfoServiceProvider,
} from '../user.providers';
import {
  ValidateUserInfoService,
  ValidateUserInfoServiceToken,
} from './ValidateUserInfoService';
import { UserRepository } from '../repository/UserRepository';
import { UserRepositoryToken } from '../repository/persistence';
import { User } from '../domain/User';
import { ObjectID } from 'bson';

describe('회원가입 테스트', () => {
  let signupService: SignupService;
  let validateEmailService: ValidateUserInfoService;
  let userRepository: UserRepository;
  const mockUserRepository = {
    findByEmail: (email) =>
      new User(new ObjectID('123123'), email, '', '', '', '', ''),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignupServiceProvider,
        ValidateUserInfoServiceProvider,
        {
          provide: UserRepositoryToken,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    signupService = module.get<SignupService>(SignupServiceToken);
    validateEmailService = module.get<ValidateUserInfoService>(
      ValidateUserInfoServiceToken,
    );
    userRepository = module.get<UserRepository>(UserRepositoryToken);
  });

  it('이메일 중복검사 테스트', async () => {
    // // given
    // const email = 'rtan@test.com';
    // const oldEmail = 'rtan@test.com';
    // jest
    //   .spyOn(mockUserRepository, 'findByEmail')
    //   .mockImplementation((email) => new User('', email, '', '', '', ''));
    //
    // // then
    // expect(email).toBe(oldEmail);
  });
});
