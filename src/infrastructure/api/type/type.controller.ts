import { Body, Controller, Get, Param, Post, ParseIntPipe, Put, Delete, ValidationPipe } from "@nestjs/common";
import { CreateTypeUseCase } from "src/application/type-use-case/create/create-type";
import { CreateTypeDto } from "src/application/type-use-case/create/create-type.dto";
import { CreateTypeResult } from "./create-type-result";
import { GetTypeResult } from "./get-type.dto";
import { GetAllTypeUseCase } from "src/application/type-use-case/getAll/getAll-type";
import { GetByIdTypeUseCase } from "src/application/type-use-case/single/getById-type";
import { UpdateTypeDto } from "src/application/type-use-case/update/update-type.dto";
import { UpdateTypeUseCase } from "src/application/type-use-case/update/update-type";
import { DeleteTypeUseCase } from "src/application/type-use-case/delete/delete-type";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Type')
@Controller("types")
export class TypeController {

    constructor(
        private createTypeUseCase: CreateTypeUseCase,
        private getAllTypeUseCase: GetAllTypeUseCase,
        private getByIdTypeUseCase: GetByIdTypeUseCase,
        private updateTypeUseCase: UpdateTypeUseCase,
        private deleteTypeUseCase: DeleteTypeUseCase,
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
    async update(@Param('id') id: number, @Body() type: UpdateTypeDto) {
        return await this.updateTypeUseCase.execute(id, type);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.deleteTypeUseCase.execute(id);
    }
}