import { Controller, Get, Param } from "@nestjs/common";
import { KeyVaultService } from "../../../domain/services/keyvault.service";


@Controller('secrets')
export class KeyVaultController {

    constructor(
        private readonly keyVaultService: KeyVaultService
    ){}

    @Get(':name')
    async getSecret(@Param('name') name: string){
        const secret = await this.keyVaultService.getSecret(name);
        return { secret }
    }
}



