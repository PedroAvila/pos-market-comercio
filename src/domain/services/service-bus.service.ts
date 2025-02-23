import { ServiceBusClient, ServiceBusReceiver, ServiceBusSender } from "@azure/service-bus";
import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { Order } from "./orderDto";
import { PeekMessageResultDto } from "./peekMessageResultDto";

const queueName = "appqueue";
//const connectionString = process.env.AZURE_SERVICE_BUS_CONNECTION_STRING;

@Injectable()
export class ServiceBusService implements OnModuleDestroy {

    private connectionString: string;
    private serviceBusClient: ServiceBusClient;
    private sender: ServiceBusSender;
    private receiver: ServiceBusReceiver;

    constructor(){
        this.connectionString = process.env.AZURE_SERVICE_BUS_CONNECTION_STRING;
        this.serviceBusClient = new ServiceBusClient(this.connectionString);
        this.sender = this.serviceBusClient.createSender(queueName);
        this.receiver = this.serviceBusClient.createReceiver(queueName);
    }

    async sendMessage(orders: Order[]): Promise<void>{
        const batch = await this.sender.createMessageBatch();

        for(const order of orders){
            const message = { 
                body: order, 
                contentType: "application/json" 
            };

            if(!batch.tryAddMessage(message)){
                console.error('Message too large to fit in the batch');
            }
        }

        await this.sender.sendMessages(batch);
        console.log('All messages sent');
    }


    async onModuleDestroy() {
        await this.sender.close();
        await this.serviceBusClient.close();
    }

    async peekMessages(numberOfMessages: number): Promise<{ messages: PeekMessageResultDto[] }> {
        try {
            const messages = await this.receiver.peekMessages(numberOfMessages);

            return { messages: messages.map((message) => new PeekMessageResultDto(String(message.messageId), message.body))}

        } catch (error) {
            console.log('Error peeking messages:', error);
        }
    }
}




















