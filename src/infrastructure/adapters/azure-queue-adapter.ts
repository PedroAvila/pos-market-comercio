import { QueueClient, QueueServiceClient } from "@azure/storage-queue";
import { IAzureQueuePort } from "src/domain/ports/azure-queue-port";


export class AzureQueueAdapter implements IAzureQueuePort {

    private queueClient: QueueClient;

    constructor() {
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        const queueName = 'appqueue';

        const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);
        this.queueClient = queueServiceClient.getQueueClient(queueName);
    }

    private async initializeQueue(): Promise<void> {
        const createQueueResponse = await this.queueClient.createIfNotExists();
        if (createQueueResponse.succeeded) {
            console.log(`Cola '${this.queueClient.name}' creada exitosamente`);
        } else {
            console.log(`Cola '${this.queueClient.name}' ya existe`);
        }
    }


    async sendMessage(message: string): Promise<void> {
        const enqueueResponse = await this.queueClient.sendMessage(message);
        console.log(`Mensaje enviado con éxito, ID: ${enqueueResponse.messageId}`);
    }

    async readMessage(): Promise<void> {
        const messages = await this.queueClient.receiveMessages({ numberOfMessages: 5 });
        for (const message of messages.receivedMessageItems) {
            console.log(`Mensaje leído: ${message.messageText}`);
            // Procesar y eliminar mensaje
            await this.queueClient.deleteMessage(message.messageId, message.popReceipt);
            console.log(`Mensaje con ID ${message.messageId} eliminado`);
        }
    }

}



