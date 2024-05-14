import { IsEmail } from 'class-validator';

export class RegisterDto {
  username: string;

  @IsEmail()
  email: string;

  password: string;
}
