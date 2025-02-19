import { Module } from '@nestjs/common';
import { PdfController } from '../infrastructure/api/pdf/pdf.controller';
import { PdfService } from '../domain/services/pdf.service';

@Module({
    controllers: [PdfController],
    providers: [PdfService]
})
export class PdfModule {}
