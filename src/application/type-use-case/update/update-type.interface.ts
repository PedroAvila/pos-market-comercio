import { UpdateTypeDto } from "./update-type.dto";


export interface IUpdateTypeUseCase {
    execute(id: number, type: UpdateTypeDto): Promise<void>
}