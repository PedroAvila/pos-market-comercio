import { GetCommerceResult } from "src/infrastructure/api/commerce";

export interface IGetCommerceUseCase {
    execute(): Promise<{ commerces: GetCommerceResult[] }>
}


