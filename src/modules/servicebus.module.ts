import { Module } from '@nestjs/common';
import { ServiceBusService } from 'src/domain/services/service-bus.service';
import { ServiceBusController } from 'src/infrastructure/api/service-bus/service-bus.controller';

@Module({
    controllers: [ServiceBusController],
    providers: [ServiceBusService]
})
export class ServicebusModule {}
