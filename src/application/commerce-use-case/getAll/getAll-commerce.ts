import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Commerce } from "src/domain/entities/commerce.entity";
import { GetCommerceResult } from "src/infrastructure/api/commerce/get-commerce-result";
import { Repository } from "typeorm";

@Injectable()
export class GetAllCommerceUseCase {

    constructor(
        @InjectRepository(Commerce)
        private commerceRepository: Repository<Commerce>
    ) { }

    async execute(): Promise<{ commerces: GetCommerceResult[] }> {

        const commerceList = await this.commerceRepository.find();
        const result = commerceList.map(commerce => new GetCommerceResult(commerce.CommerceId, commerce.Type.TypeId, commerce.Name));
        return { commerces: result };
    }
}