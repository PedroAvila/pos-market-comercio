import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Type } from "src/domain/entities/type.entity";
import { Repository } from "typeorm";

@Injectable()
export class DeleteTypeUseCase {

    constructor(
        @InjectRepository(Type)
        private typeRepository: Repository<Type>
    ) { }

    async execute(id: number): Promise<void> {

        const result = await this.typeRepository.delete({ TypeId: id });

        if (result.affected === 0)
            throw new HttpException('Type not found', HttpStatus.NOT_FOUND);
    }
}
