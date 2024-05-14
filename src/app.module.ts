import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersRepository } from './users/users.repository';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      { name: 'USERS_SERVICE', transport: Transport.TCP },
    ]),
  ],
  controllers: [UsersController, UsersRepository],
  providers: [UsersService, UsersRepository],
})
export class AppModule {}
