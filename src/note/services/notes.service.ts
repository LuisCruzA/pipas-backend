import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Note } from '../entities/note.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from '../dto/create-note.dto.js';
import { UpdateNoteDto } from '../dto/update-note.dto.js';

@Injectable()
export class NotesService {
    //inyeccion de dependencias ´para conexion de la bd
    constructor(@InjectRepository(Note) private noteRepo:Repository<Note>){}


    async findAll(){
        const note = await this.noteRepo.find()

        return note
    }

    async findOne(id:string){
        const note= await this.noteRepo.findOneBy({id})
        if (!note) {
      throw new NotFoundException(`La nota con id ${id} no fue encontrado`);
    }

    return note;
        }


        async create(body:CreateNoteDto){
            const note = this.noteRepo.create(body)

            return await this.noteRepo.save(note)
        }


        async update(id:string, body:UpdateNoteDto){
            const note = await this.noteRepo.preload({
                id:id,
                ...body
            })

             if (!note) {
      throw new NotFoundException(`La nota con id ${id} no fue encontrado`);
    }

        return await this.noteRepo.save(note)
        }


        async remove(id :string){
            const note = await this.noteRepo.findOneBy({id})
             if (!note) {
      throw new NotFoundException(`La nota con id ${id} no fue encontrado`);
    }

        return await this.noteRepo.remove(note)
        }
    }


