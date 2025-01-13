import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Commerce } from "src/domain/entities/commerce.entity";
import { Repository } from "typeorm";

@Injectable()
export class DeleteCommerceUseCase {

    constructor(
        @InjectRepository(Commerce)
        private commerceRepository: Repository<Commerce>
    ) { }

    async execute(id: number): Promise<void> {

        const commerce = await this.commerceRepository.findOne({
            where: {
                CommerceId: id,
            },
        });

        if (!commerce)
            throw new HttpException(`Commerce ${id} not found`, HttpStatus.NOT_FOUND);

        await this.commerceRepository.delete({ CommerceId: id });
    }
}