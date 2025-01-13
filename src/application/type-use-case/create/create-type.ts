import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Type } from "src/domain/entities/type.entity";
import { Repository } from "typeorm";
import { CreateTypeDto } from "./create-type.dto";
import { ICreateTypeUseCase } from "./create-type.interface";
import { CreateTypeResult } from "src/infrastructure/api/type";

@Injectable()
export class CreateTypeUseCase implements ICreateTypeUseCase {

    constructor(
        @InjectRepository(Type)
        private typeRepository: Repository<Type>
    ) { }

    async execute(dto: CreateTypeDto): Promise<{ type: CreateTypeResult }> {

        const exist = await this.typeRepository.findOne({
            where: {
                Name: dto.Name,
            },
        });

        if (exist)
            throw new HttpException('Type already exist', HttpStatus.CONFLICT);

        const newType = this.typeRepository.create(dto);
        const entity = await this.typeRepository.save(newType);

        return { type: new CreateTypeResult(entity.TypeId, entity.Name) };
    }
}