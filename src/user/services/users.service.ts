import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    //inyecccion de dependdencias para conexion a la bd
    constructor(@InjectRepository(User) private userRepo: Repository<User>){}

    findAll(){
        return this.userRepo.find()
    }

    findOne(id:number){
        return this.userRepo.findOneBy({id})
    }

    create(body:any){
        const newUSer = this.userRepo.create(body);
        return this.userRepo.save(newUSer);
    }
}
