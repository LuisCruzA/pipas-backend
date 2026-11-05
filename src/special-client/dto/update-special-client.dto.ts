import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialClientDto } from './create-special-client.dto.js';

export class UpdateSpecialClientDto extends PartialType(CreateSpecialClientDto) {}
