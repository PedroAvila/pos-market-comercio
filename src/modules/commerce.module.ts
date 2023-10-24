import { Module } from '@nestjs/common';
import { TypeModule } from './type.module';

@Module({
  imports: [TypeModule]
})
export class CommerceModule {}
