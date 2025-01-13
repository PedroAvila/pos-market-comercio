import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Commerce } from "src/domain/entities/commerce.entity";
import { Repository } from "typeorm";
import { UpdateCommerce } from "./update-commerce.dto";
import { IUpdateCommerceUseCase } from "./update-commerce.interface";

@Injectable()
export class UpdateCommerceUseCase implements IUpdateCommerceUseCase {

    constructor(
        @InjectRepository(Commerce)
        private commerceRepository: Repository<Commerce>
    ) { }

    async execute(id: number, dto: UpdateCommerce): Promise<void> {

        const commerce = await this.commerceRepository.findOne({
            where: {
                CommerceId: id,
            },
        });

        if (!commerce)
            throw new HttpException(`Commerce ${id} not found`, HttpStatus.NOT_FOUND);

        const updateCommerce = Object.assign(commerce, dto);
        await this.commerceRepository.save(updateCommerce);
    }
}