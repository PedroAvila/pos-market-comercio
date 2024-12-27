import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Type } from "src/domain/entities/type.entity";
import { Repository } from "typeorm";
import { UpdateTypeDto } from "./update-type.dto";

@Injectable()
export class UpdateTypeUseCase {

    constructor(
        @InjectRepository(Type)
        private typeRepository: Repository<Type>
    ) { }

    async execute(id: number, type: UpdateTypeDto): Promise<void> {

        const typeFound = await this.typeRepository.findOne({
            where: {
                TypeId: id,
            },
        });

        if (!typeFound)
            throw new HttpException('Type not found', HttpStatus.NOT_FOUND);

        const updateType = Object.assign(typeFound, type);
        await this.typeRepository.save(updateType);

    }

}