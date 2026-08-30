import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service.js';
import { UsersController } from './controllers/users.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';

@Module({
  //registramos la Entidad de Users
  imports:[
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UserModule {}
