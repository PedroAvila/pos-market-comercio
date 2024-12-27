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
        const result = await this.commerceRepository.delete({ CommerceId: id });

        if (result.affected === 0)
            throw new HttpException('Commerce not found', HttpStatus.NOT_FOUND);
    }
}