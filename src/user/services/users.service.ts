import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity.js';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { error } from 'console';
import { UpdateUserDto } from '../dto/update-user.dto.js';
@Injectable()
export class UsersService {

    //inyecccion de dependdencias para conexion a la bd
    constructor(@InjectRepository(User) private userRepo: Repository<User>){}

    async findAll(){
       const user = await this.userRepo.find();
        return user;
    }


   async findOne(id:string){
        const user = await this.userRepo.findOneBy({id});
        if(!user){
            throw new Error(`Usuario con el id ${id} no encontrado`)
        }
    return user;
    }


   async create(body: CreateUserDto){
        const newUSer =  this.userRepo.create(body);
       return  await this.userRepo.save(newUSer);
        
    }


    async update(id:string, body:UpdateUserDto){
        const user = await this.userRepo.preload({
            id:id,
            ...body
        });

        if(!user){
            throw new Error(`Usuario con el id ${id} no encontrado`);
        }

        return await this.userRepo.save(user)

    }

    async remove(id:string){
        const user = await this.userRepo.findOneBy({id})

        if(!user){
            throw new Error(`Usuario con el id ${id} no encontrado`);
        }

        return await this.userRepo.remove(user);

    }


}


//.save() (El todoterreno): Sirve tanto para crear como para actualizar. 
// Si le pasas un objeto sin ID, ejecuta un INSERT para crear un nuevo registro. 
// Si le pasas un objeto que ya incluye un ID (ej. { id: 3, estado: 'inactivo' }), 
// TypeORM asume que ya existe y ejecuta un UPDATE sobre ese registro en específico.


//.preload() (El buscador inteligente): Es tu mejor amigo para los métodos de actualización (PATCH).
//  Recibe un objeto con un ID y datos nuevos. TypeORM va a la base de datos, busca (por ejemplo) a la pipa con ese ID,
//  y fusiona automáticamente sus datos viejos con los nuevos que enviaste. Si el ID no existe en la tabla,
//  te devuelve undefined, lo que te permite lanzar un error 404 limpio.


//.merge() (El fusionador en memoria): Combina dos objetos (los datos viejos y los nuevos),
//  pero no toca la base de datos. Solo prepara el objeto final en la memoria de tu servidor Node.js.
//  Se usa cuando necesitas armar un registro complejo paso a paso antes de finalmente llamar a .save().


//.delete() (El francotirador): Borra un registro directamente usando su ID o una condición, 
// por ejemplo: .delete(5) o .delete({ estado: 'inactivo' }). Es extremadamente rápido 
// porque lanza la consulta DELETE FROM directo a PostgreSQL sin molestarse en traer los datos a la memoria primero.