import { CreateCommerceResult } from "src/infrastructure/api/commerce";
import { CreateCommerce } from "./create-commerce.dto";

export interface ICreateCommerceUseCase {
    execute(dto: CreateCommerce): Promise<{ commerce: CreateCommerceResult }>
}


