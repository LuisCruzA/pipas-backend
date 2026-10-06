import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service.js';
import { NotesController } from './controllers/notes.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity.js';

@Module({
  //registramos la entidad de Note
  imports:[TypeOrmModule.forFeature([Note])],
  providers: [NotesService],
  controllers: [NotesController]
})
export class NoteModule {}
