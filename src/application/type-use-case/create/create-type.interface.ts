
import { CreateTypeResult } from "src/infrastructure/api/type";
import { CreateTypeDto } from "./create-type.dto";


export interface ICreateTypeUseCase {
    execute(dto: CreateTypeDto): Promise<{ type: CreateTypeResult }>
}




