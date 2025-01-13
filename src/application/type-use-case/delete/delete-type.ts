import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Type } from "src/domain/entities/type.entity";
import { Repository } from "typeorm";
import { IDeleteTypeUseCase } from "./delete-type.interface";

@Injectable()
export class DeleteTypeUseCase implements IDeleteTypeUseCase {

    constructor(
        @InjectRepository(Type)
        private typeRepository: Repository<Type>
    ) { }

    async execute(id: number): Promise<void> {

        const type = await this.typeRepository.findOne({
            where: {
                TypeId: id,
            },
        });
        if (!type)
            throw new HttpException(`Type ${id} not found`, HttpStatus.NOT_FOUND);

        await this.typeRepository.delete({ TypeId: id });
    }
}
