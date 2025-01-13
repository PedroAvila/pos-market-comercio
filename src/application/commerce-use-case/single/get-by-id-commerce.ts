import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Commerce } from "src/domain/entities/commerce.entity";
import { GetByIdCommerceResult } from "src/infrastructure/api/commerce";
import { Repository } from "typeorm";
import { IGetByIdCommerceUseCase } from "./get-by-id-commerce.interface";

@Injectable()
export class GetByIdCommerceUseCase implements IGetByIdCommerceUseCase {

    constructor(
        @InjectRepository(Commerce)
        private commerceRepository: Repository<Commerce>
    ) { }

    async execute(id: number): Promise<{ commerce: GetByIdCommerceResult }> {

        const entity = await this.commerceRepository.findOne({
            relations: ['Type'],
            where: {
                CommerceId: id,
            },
        });

        if (!entity)
            throw new HttpException('Commerce not found', HttpStatus.NOT_FOUND);

        const commerce = new GetByIdCommerceResult(entity.CommerceId, entity.Type.TypeId, entity.Name);
        return { commerce: commerce };
    }
}