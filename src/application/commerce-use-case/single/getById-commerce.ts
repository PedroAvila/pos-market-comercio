import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Commerce } from "src/domain/entities/commerce.entity";
import { GetByIdCommerceResult } from "src/infrastructure/api/commerce/getById-commerce-result";
import { Repository } from "typeorm";

@Injectable()
export class GetByIdCommerceUseCase {

    constructor(
        @InjectRepository(Commerce)
        private commerceRepository: Repository<Commerce>
    ) { }

    async execute(id: number): Promise<{ commerce: GetByIdCommerceResult }> {

        const entity = await this.commerceRepository.findOne({
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