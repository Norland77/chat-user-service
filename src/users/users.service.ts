import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IUser } from './interfaces/IUser';
import { RegisterDto } from './dto/register.dto';
import { genSaltSync, hash } from 'bcrypt';
import { UserEditDto } from './dto/user-edit.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findUserById(id: string): Promise<IUser> {
    const user: IUser | null = await this.usersRepository.findUserById(id);

    if (!user) {
      throw new BadRequestException(`user is not exist`);
    }

    return user;
  }

  async deleteUserById(Id: string): Promise<IUser> {
    return this.usersRepository.deleteUserById(Id);
  }

  async getUserByName(
    username: string,
    email: string,
    type?: string,
  ): Promise<IUser> {
    const user: IUser | null = await this.usersRepository.getUserByName(
      username,
      email,
    );

    if (type === 'login') {
      if (!user) {
        throw new BadRequestException(`not found user with name: ${username}`);
      }
      return user;
    } else if (type === 'reg') {
      if (user) {
        throw new BadRequestException(
          `user with username: ${username} is already exist`,
        );
      }
      return user;
    }
  }

  async createUser(dto: RegisterDto): Promise<IUser> {
    if (dto.password === '' || dto.password === undefined) {
      throw new BadRequestException(`Password is empty`);
    }
    const hashedPassword: string = await hash(dto.password, genSaltSync(10));

    const user = await this.usersRepository.createUser(dto, hashedPassword);

    if (!user) {
      throw new BadRequestException(
        `Can't register user with data ${JSON.stringify(dto)}`,
      );
    }

    return user;
  }

  async getAllUsers(): Promise<IUser[]> {
    const user: IUser[] | [] = await this.usersRepository.getAllUsers();

    if (user.length === 0) {
      throw new BadRequestException(`users not found`);
    }

    return user;
  }

  async editUserById(id: string, dto: UserEditDto) {
    return this.usersRepository.editUserById(id, dto);
  }

  async setAvatarById(id: string, avatar_url: string) {
    return this.usersRepository.setAvatarById(id, avatar_url);
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException(`user with email: ${email} is not exist`);
    }

    return user;
  }
}
