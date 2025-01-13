import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Commerce } from "src/domain/entities/commerce.entity";
import { GetCommerceResult } from "src/infrastructure/api/commerce";
import { Repository } from "typeorm";
import { IGetCommerceUseCase } from "./get-commerce.interface";

@Injectable()
export class GetCommerceUseCase implements IGetCommerceUseCase {

    constructor(
        @InjectRepository(Commerce)
        private commerceRepository: Repository<Commerce>
    ) { }

    async execute(): Promise<{ commerces: GetCommerceResult[] }> {

        const commerceList = await this.commerceRepository.find({
            relations: ['Type']
        });
        const result = commerceList.map(commerce => new GetCommerceResult(commerce.CommerceId, commerce.Type.TypeId, commerce.Name));
        return { commerces: result };
    }
}