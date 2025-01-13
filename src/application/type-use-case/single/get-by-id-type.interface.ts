import { GetByIdTypeResult } from "src/infrastructure/api/type";


export interface IGetByIdTypeUseCase {
    execute(id: number): Promise<{ type: GetByIdTypeResult }>
}





