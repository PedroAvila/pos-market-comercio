import { GetByIdTypeResult } from './../../../infrastructure/api/type/getById-type-result';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Type } from "src/domain/entities/type.entity";
import { Repository } from "typeorm";

@Injectable()
export class GetByIdTypeUseCase {

    constructor(
        @InjectRepository(Type)
        private typeRepository: Repository<Type>
    ) { }

    async execute(id: number): Promise<{ type: GetByIdTypeResult }> {

        const entity = await this.typeRepository.findOne({
            where: {
                TypeId: id,
            },
        });

        if (!entity)
            throw new HttpException('Type not found', HttpStatus.NOT_FOUND);

        const type = new GetByIdTypeResult(entity.TypeId, entity.Name);
        return { type: type };
    }
}