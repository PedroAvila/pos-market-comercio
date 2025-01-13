import { GetTypeResult } from "src/infrastructure/api/type/get-type.dto";

export interface ITypeServicePort {
    sendNameType(types: GetTypeResult[])
}


