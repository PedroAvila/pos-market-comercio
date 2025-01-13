import { UpdateCommerce } from "./update-commerce.dto";

export interface IUpdateCommerceUseCase {
    execute(id: number, dto: UpdateCommerce): Promise<void>
}





