import { GetTypeResult } from "src/infrastructure/api/type";

export interface IGetTypeUseCase {
    execute(): Promise<{ types: GetTypeResult[] }>
}