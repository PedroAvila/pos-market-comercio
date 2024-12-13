import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeModule } from './modules/type.module';
import { CommerceModule } from './modules/commerce.module';
import { ProfileModule } from './modules/profile.module';
import { AuthModule } from './auth/auth.module';
import { TableModule } from './modules/table.module';
import { CategoryModule } from './modules/category.module';
import { ProductModule } from './modules/product.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './config/env-schema';

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
    UserModule,
    TypeModule,
    CommerceModule,
    ProfileModule,
    AuthModule,
    TableModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  // constructor(){
  //   console.log(process.env);
  // }
}
