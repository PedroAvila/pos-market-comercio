import { Injectable } from "@nestjs/common";
import * as pdfParse from 'pdf-parse';


@Injectable()
export class PdfService {

async extractTextFromPdf(fileBuffer: Buffer): Promise<string>{
    try {
        
        const data = await pdfParse(fileBuffer);

        // const phrase = "Me levanto a las 7 todos los días";
        // if(data.text.includes(phrase)){
        //     console.log("Frase encontrada en el texto");
        // }else{
        //     console.log("Frase no encontrada en el texto");
        // }

        const rules: string[] = ["Me levanto a las 7 todos los días", "Normalmente como arroz", "Hola mundo", "la tarta con el cuchillo"];
        const result = this.searchPhrasesInText(data.text, rules);
        console.log({ result })

        return data.text;
    } catch (error) {
        throw new Error('Error parsing pdf');
    }
}


searchPhrasesInText(text: string, phrases: string[]): Record<string, boolean>{
    const result: Record<string, boolean> = {};

    for(const pharse of phrases){
        result[pharse] = text.includes(pharse);
    }
    return result;
}


}






