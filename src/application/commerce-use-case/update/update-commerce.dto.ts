import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCommerce {

    @IsNumber()
    @IsNotEmpty()
    typeId: number;

    @IsString()
    @IsNotEmpty()
    name: string;
}