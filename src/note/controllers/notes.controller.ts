import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateNoteDto } from '../dto/create-note.dto.js';
import { UpdateNoteDto } from '../dto/update-note.dto.js';
import { NotesService } from '../services/notes.service.js';

@Controller('api/notes')
export class NotesController {
    constructor(private noteService:NotesService){}

    @Get()
    getAll(){
        return this.noteService.findAll()
    }

    @Get(':id')
    getOne(@Param('id', ParseUUIDPipe) id: string){
        return this.noteService.findOne(id)

    }

    @Post()
    create(@Body() body:CreateNoteDto){
        return this.noteService.create(body)
    }

    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id:string, @Body() body:UpdateNoteDto){
        return this.noteService.update(id, body)
    }

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id:string){
        return this.noteService.remove(id)
    }
}
