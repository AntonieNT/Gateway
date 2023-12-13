import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ExceptionEntity } from './common/entities/exception.entity';
import { DatabaseModule } from './database/database.module';
import { NoExceptionEntity } from './common/entities/no-exception.entity';
@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.GW_DB_HOST,
      port: +process.env.GW_DB_PORT,
      username: process.env.GW_DB_USERNAME,
      password: process.env.GW_DB_PASSWORD,
      database: process.env.GW_DB_NAME,
      entities: [ExceptionEntity, NoExceptionEntity],
      synchronize: true,
    }),
    ClientsModule.register([
      { name: 'RECEIVER_SERVICE', transport: Transport.RMQ },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
