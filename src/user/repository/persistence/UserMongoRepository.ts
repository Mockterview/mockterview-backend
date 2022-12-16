import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectID } from 'bson';
import { User } from '../../domain/User';
import { UserMongoDocument, UserMongoEntity } from './UserMongoEntity';
import { UserMapperToken, UserMongoMapper } from './UserMongoMapper';
import { UserRepository } from '../UserRepository';

export const UserRepositoryToken = 'UserRepositoryToken';

@Injectable()
export class UserMongoRepository implements UserRepository {
  constructor(
    @InjectModel(UserMongoEntity.name)
    private userModel: Model<UserMongoDocument>,
    @Inject(UserMapperToken)
    private userMapper: UserMongoMapper,
  ) {}

  async findById(userId: string): Promise<User> | null {
    const user = await this.userModel.findOne({ _id: new ObjectID(userId) });
    return user ? this.userMapper.mapEntityToDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User> | null {
    const user = await this.userModel.findOne({ email });
    return user ? this.userMapper.mapEntityToDomain(user) : null;
  }

  async findByPhone(phone: string): Promise<string> | null {
    const user = await this.userModel.findOne({ phone });
    return user ? user.email : null;
  }

  async findByChangePassVerifyToken(token: string): Promise<string> | null {
    const user = await this.userModel.findOne({ changePassVerifyToken: token });
    return user ? user.email : null;
  }

  async save(user: User): Promise<any> {
    // TODO: async await 설정한 이유?
    return await this.userModel.create({
      _id: new ObjectID(user._id),
      email: user.email,
      name: user.name,
      phone: user.phone,
      password: user.password,
      refreshToken: '',
      changePassVerifyToken: '',
      studyDay: [],
    });
  }

  async updateRefreshToken(userId: string, token: string): Promise<number> {
    // TODO: async await 설정한 이유?
    const response = await this.userModel.updateOne(
      { _id: new ObjectID(userId) },
      {
        $set: { refreshToken: token },
      },
    );
    return response.modifiedCount;
  }

  async updateChangeToken(userId: string, token: string): Promise<void> {
    await this.userModel.updateOne(
      { _id: new ObjectID(userId) },
      {
        $set: { changePassVerifyToken: token },
      },
    );
  }

  async cleanupTokenById(userId: string): Promise<number> {
    const response = await this.userModel.updateOne(
      { _id: new ObjectID(userId) },
      { $set: { refreshToken: '' } },
    );
    return response.modifiedCount;
  }

  async updateChangePassword(
    userEmail: string,
    userPassword: string,
  ): Promise<number> {
    const response = await this.userModel.updateOne(
      { email: userEmail },
      {
        $set: { password: userPassword },
      },
    );
    return response.modifiedCount;
  }

  async removeChangeToken(email: string): Promise<void> {
    await this.userModel.updateOne(
      { email },
      {
        $set: { changePassVerifyToken: '' },
      },
    );
  }

  async createUserStudyDay(userId: string, day: string): Promise<number> {
    const response = await this.userModel.updateOne(
      { _id: new ObjectID(userId) },
      {
        $addToSet: { studyDay: { day: day } },
      },
    );

    return response.modifiedCount;
  }

  async removeUser(userId: string): Promise<void> {
    await this.userModel.deleteOne({ _id: new ObjectID(userId) });
  }
}
