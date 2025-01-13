import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, ValidationPipe } from "@nestjs/common";
import { GetCommerceResult } from "./get-commerce-result";
import { ApiTags } from '@nestjs/swagger';
import {
    CreateCommerce,
    ICreateCommerceUseCase,
    IDeleteCommerceUseCase,
    IGetByIdCommerceUseCase,
    IGetCommerceUseCase,
    IUpdateCommerceUseCase,
    UpdateCommerce
} from 'src/application/commerce-use-case';

@ApiTags('Commerce')
@Controller("commerces")
export class CommerceController {

    constructor(
        @Inject('ICreateCommerceUseCase')
        private createCommerceUseCase: ICreateCommerceUseCase,
        @Inject('IGetCommerceUseCase')
        private getAllCommerceUseCase: IGetCommerceUseCase,
        @Inject('IGetByIdCommerceUseCase')
        private getByIdCommerceUseCase: IGetByIdCommerceUseCase,
        @Inject('IUpdateCommerceUseCase')
        private updateCommerceUseCase: IUpdateCommerceUseCase,
        @Inject('IDeleteCommerceUseCase')
        private deleteCommerceUseCase: IDeleteCommerceUseCase
    ) { }

    @Get()//comentario
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