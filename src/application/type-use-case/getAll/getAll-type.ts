import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Type } from "src/domain/entities/type.entity";
import { Repository } from "typeorm";
import { GetTypeResult } from "../../../infrastructure/api/type/get-type.dto";
import { ITypeServicePort } from "src/domain/ports/type-service-port";

@Injectable()
export class GetAllTypeUseCase {

    constructor(
        @InjectRepository(Type)
        private readonly typeRepository: Repository<Type>,
        @Inject('ITypeServicePort')
        private readonly typeService: ITypeServicePort,
    ) { }

    async execute(): Promise<{ types: GetTypeResult[] }> {
        const typesList = await this.typeRepository.find();

        const result = typesList.map(type => new GetTypeResult(type.TypeId, type.Name));
        //? Llamo a la regla de negocio
        await this.typeService.sendNameType(result);
        return { types: result };
    }
}