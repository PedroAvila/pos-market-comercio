import { IsNumber, IsString } from "class-validator";


export class Order {
    @IsNumber()
    id: number;

    @IsString()
    courseName: string;

    @IsNumber()
    price: number;
}