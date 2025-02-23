import { Body, Controller, Get, Post } from "@nestjs/common";
import { Order } from "src/domain/services/orderDto";
import { ServiceBusService } from "src/domain/services/service-bus.service";

@Controller('service-bus')
export class ServiceBusController {

    constructor(
        private readonly serviceBusService: ServiceBusService
    ){}


    @Post()
    async sendMessage(@Body() orders: Order[]){
        await this.serviceBusService.sendMessage(orders);
    }

    @Get()
    async peekMessages(@Body('count') count: number){
        return await this.serviceBusService.peekMessages(count);
    }
}



