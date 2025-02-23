import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import { OnModuleInit } from "@nestjs/common";


export class KeyVaultService implements OnModuleInit {

    private secretClient: SecretClient;

    constructor(){}

    async onModuleInit() {
        const keyVaultUrl = process.env.KEY_VAULT_URL;

        // Autenticacion con Azure
        const credential = new DefaultAzureCredential();
        this.secretClient = new SecretClient(keyVaultUrl, credential);
    }

    async getSecret(secretName: string): Promise<string|null>{
        try {
            const secret = await this.secretClient.getSecret(secretName);
            return secret.value;
        } catch (error) {
            console.error(`Error obteniendo el secreto ${secretName}:`, error );
            return null;
        }
    }
}








