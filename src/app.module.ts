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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'tecsoftware.database.windows.net',
      port: 1433,
      username: 'developer',
      password: 'lima01@46',
      database: 'comanda',
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
export class AppModule {}
