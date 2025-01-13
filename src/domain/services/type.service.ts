import { GetTypeResult } from "src/infrastructure/api/type/get-type.dto";
import { ITypeServicePort } from "../ports/type-service-port";
import { IAzureQueuePort } from "../ports/azure-queue-port";
import { Inject } from "@nestjs/common";


export class TypeService implements ITypeServicePort {

    constructor(
        @Inject('IAzureQueuePort')
        private readonly azureQueueMessage: IAzureQueuePort,
    ) { }

    async sendNameType(types: GetTypeResult[]) {
        for (const type of types) {
            await this.azureQueueMessage.sendMessage(type.name);
        }
    }

}

