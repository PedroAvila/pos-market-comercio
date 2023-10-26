import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeModule } from './modules/type.module';
import { CommerceModule } from './modules/commerce.module';
import { ProfileModule } from './modules/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'my-friends.database.windows.net',
      port: 1433,
      username: 'developer',
      password: 'LimaPeru46',
      database: 'market',
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
