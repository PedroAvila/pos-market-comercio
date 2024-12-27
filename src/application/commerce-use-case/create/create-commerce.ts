import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Commerce } from "src/domain/entities/commerce.entity";
import { Repository } from "typeorm";
import { CreateCommerce } from "./create-commerce.dto";
import { CreateCommerceResult } from "src/infrastructure/api/commerce/create-commerce-result";
import { Type } from "src/domain/entities/type.entity";

@Injectable()
export class CreateCommerceUseCase {

    constructor(
        @InjectRepository(Commerce)
        private commerceRepository: Repository<Commerce>,
        @InjectRepository(Type)
        private typeRepository: Repository<Type>,
    ) { }

    async execute(dto: CreateCommerce): Promise<{ commerce: CreateCommerceResult }> {

        const type = await this.typeRepository.findOne({
            where: {
                TypeId: dto.typeId
            },
        });

        if (!type)
            throw new HttpException('Type not found', HttpStatus.NOT_FOUND);

        const commerceFound = await this.commerceRepository.findOne({
            where: {
                Name: dto.name,
            },
        });

        if (commerceFound)
            throw new HttpException('Commerce already exists', HttpStatus.CONFLICT);

        const newCommerce = new Commerce();
        newCommerce.Name = dto.name;
        newCommerce.Type = type;

        const saveCommerce = this.commerceRepository.create(newCommerce);
        const entity = await this.commerceRepository.save(saveCommerce);

        return { commerce: new CreateCommerceResult(entity.CommerceId, entity.Type.TypeId, entity.Name) };
    }
}