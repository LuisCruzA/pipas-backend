import { PartialType } from "@nestjs/mapped-types";
import { CreateVehicleDto } from "./create-vehicle.js";

export class UpdateVehicleDto extends PartialType(CreateVehicleDto){}