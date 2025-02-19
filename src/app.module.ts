import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeModule } from './modules/type.module';
import { CommerceModule } from './modules/commerce.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './config/env-schema';
import { KeyVaultService } from './domain/services/keyvault.service';
import { KeyVaultController } from './infrastructure/api/keyvault/keyvault.controller';
import { PdfModule } from './modules/pdf.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql' | 'postgres' | 'mssql' | 'sqlite' | 'mariadb' | 'oracle',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      options: {
        encrypt: true, // Opciones de cifrado
        trustServerCertificate: false, // Opciones adicionales,
      },
    }),
    TypeModule,
    CommerceModule,
    PdfModule
  ],
  controllers: [AppController, KeyVaultController],
  providers: [AppService, KeyVaultService],
})
export class AppModule { }
