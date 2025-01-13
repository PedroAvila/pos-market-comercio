import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Type } from "src/domain/entities/type.entity";
import { Repository } from "typeorm";
import { GetTypeResult } from "../../../infrastructure/api/type/get-type.dto";

@Injectable()
export class GetAllTypeUseCase {

    constructor(
        @InjectRepository(Type)
        private typeRepository: Repository<Type>
    ) { }

    async execute(): Promise<{ types: GetTypeResult[] }> {
        const typesList = await this.typeRepository.find();

        const result = typesList.map(type => new GetTypeResult(type.TypeId, type.Name));
        return { types: result };
    }
}