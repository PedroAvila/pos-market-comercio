import { DeleteCommerceUseCase } from './../../../application/commerce-use-case/delete/delete-commerce';
import { UpdateCommerceUseCase } from './../../../application/commerce-use-case/update/update-commerce';
import { GetByIdCommerceUseCase } from './../../../application/commerce-use-case/single/getById-commerce';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, ValidationPipe } from "@nestjs/common";
import { CreateCommerceUseCase } from "src/application/commerce-use-case/create/create-commerce";
import { CreateCommerce } from "src/application/commerce-use-case/create/create-commerce.dto";
import { GetCommerceResult } from "./get-commerce-result";
import { GetAllCommerceUseCase } from "src/application/commerce-use-case/getAll/getAll-commerce";
import { UpdateCommerce } from 'src/application/commerce-use-case/update/update-commerce.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Commerce')
@Controller("commerces")
export class CommerceController {

    constructor(
        private createCommerceUseCase: CreateCommerceUseCase,
        private getAllCommerceUseCase: GetAllCommerceUseCase,
        private getByIdCommerceUseCase: GetByIdCommerceUseCase,
        private updateCommerceUseCase: UpdateCommerceUseCase,
        private deleteCommerceUseCase: DeleteCommerceUseCase
    ) { }

    @Get()
    async getAll(): Promise<{ commerces: GetCommerceResult[] }> {
        return await this.getAllCommerceUseCase.execute();
    }

    @Get(':id')
    async single(@Param('id', ParseIntPipe) id: number) {
        return await this.getByIdCommerceUseCase.execute(id);
    }

    @Post()
    async create(@Body(ValidationPipe) dto: CreateCommerce) {
        return await this.createCommerceUseCase.execute(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCommerce) {
        return await this.updateCommerceUseCase.execute(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.deleteCommerceUseCase.execute(id);
    }
}