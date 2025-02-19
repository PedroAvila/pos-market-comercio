import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { PdfService } from "../../../domain/services/pdf.service";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('pdfs')
export class PdfController {

    constructor(
        private readonly pdfService: PdfService
    ){}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File){

        if(!file) return{ message: 'No file uploaded' };

        const extractedText = await this.pdfService.extractTextFromPdf(file.buffer);
        return { text: extractedText }
    }
}



