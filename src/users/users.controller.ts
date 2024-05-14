import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { IUser } from './interfaces/IUser';
import { UserEditDto } from './dto/user-edit.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('get.users.all')
  async getAllUsers(): Promise<IUser[]> {
    return this.usersService.getAllUsers();
  }

  @MessagePattern('get.users.byId')
  async findUserById(id: string): Promise<IUser> {
    console.log(id);
    return this.usersService.findUserById(id);
  }

  @MessagePattern('delete.users.deleteById')
  async deleteUserById(id: string): Promise<IUser> {
    return this.usersService.deleteUserById(id);
  }

  @MessagePattern('put.users.editById')
  async editUserById(data: { id: string; dto: UserEditDto }) {
    await this.usersService.findUserById(data.id);

    return this.usersService.editUserById(data.id, data.dto);
  }

  @MessagePattern('get.users.byName')
  async getUserByName(data: {
    name: string;
    email: string;
    type?: string;
  }): Promise<IUser> {
    return this.usersService.getUserByName(data.name, data.email, data.type);
  }

  @MessagePattern('post.users.create')
  async userCreate(dto: RegisterDto): Promise<IUser> {
    return this.usersService.createUser(dto);
  }

  @MessagePattern('get.users.byEmail')
  async getUserByEmail(email: string): Promise<IUser> {
    return this.usersService.getUserByEmail(email);
  }

  @MessagePattern('get.users.setAvatarById')
  async setAvatarById(data: {
    id: string;
    avatar_url: string;
  }): Promise<IUser> {
    return this.usersService.setAvatarById(data.id, data.avatar_url);
  }
}
