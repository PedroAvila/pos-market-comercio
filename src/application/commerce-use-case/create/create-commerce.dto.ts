import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateCommerce {
    @IsNumber()
    @IsNotEmpty()
    typeId: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'Name',
        type: 'string',
        required: true,
        description: 'commerce name',
        example: 'Acme',
    })
    name: string
}