import { Body, Controller, Get, Param, Post, ParseIntPipe, Put, Delete, ValidationPipe, HttpCode, HttpStatus, Inject } from "@nestjs/common";
import { CreateTypeResult } from "./create-type-result";
import { GetTypeResult } from "./get-type.dto";
import { ApiTags } from "@nestjs/swagger";
import { CreateTypeDto, ICreateTypeUseCase, IDeleteTypeUseCase, IGetByIdTypeUseCase, IGetTypeUseCase, IUpdateTypeUseCase, UpdateTypeDto } from "src/application/type-use-case";


@ApiTags('Type')
@Controller("types")
export class TypeController {

    constructor(
        @Inject('ICreateTypeUseCase')
        private createTypeUseCase: ICreateTypeUseCase,
        @Inject('IGetTypeUseCase')
        private getAllTypeUseCase: IGetTypeUseCase,
        @Inject('IGetByIdTypeUseCase')
        private getByIdTypeUseCase: IGetByIdTypeUseCase,
        @Inject('IUpdateTypeUseCase')
        private updateTypeUseCase: IUpdateTypeUseCase,
        @Inject('IDeleteTypeUseCase')
        private deleteTypeUseCase: IDeleteTypeUseCase,
    ) { }

    @Get()
    async getAll(): Promise<{ types: GetTypeResult[] }> {
        return await this.getAllTypeUseCase.execute();
    };

    @Get(':id')
    async single(@Param('id', ParseIntPipe) id: number) {
        return await this.getByIdTypeUseCase.execute(id);
    }

    @Post()
    async create(@Body(ValidationPipe) dto: CreateTypeDto): Promise<{ type: CreateTypeResult }> {
        return await this.createTypeUseCase.execute(dto);
    };

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(@Param('id') id: number, @Body() type: UpdateTypeDto) {
        return await this.updateTypeUseCase.execute(id, type);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.deleteTypeUseCase.execute(id);
    }
}