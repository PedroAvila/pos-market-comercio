import { GetByIdCommerceResult } from "src/infrastructure/api/commerce";

export interface IGetByIdCommerceUseCase {
    execute(id: number): Promise<{ commerce: GetByIdCommerceResult }>
}



