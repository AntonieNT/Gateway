import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ExceptionEntity } from './common/entities/exception.entity';
import { NoExceptionEntity } from './common/entities/no-exception.entity';
import { v4 as uuidv4 } from 'uuid';
import { EventInterface } from './interfaces/event.interface';
@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}
  async saveEvent(info: EventInterface) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // ? ------------------------- Start Transaction ------------------------------//
      if (info.exception == true) {
        const generatedId = uuidv4();
        const exceptionToSave: ExceptionEntity = {
          id: generatedId,
          code: info.code,
          success: info.success,
          entity: info.entity,
          message: info.message,
          timestamp: info.timestamp,
          host: info.host,
          ip: info.ip,
          path: info.path,
          cookies: info.cookies == undefined ? 'No cookies' : info.cookies,
          userAgent: info.userAgent,
          params: info.params,
          method: info.method,
          body: info.body,
        };
        console.log(exceptionToSave);

        await queryRunner.manager.save(ExceptionEntity, exceptionToSave);
      } else {
        const generatedId = uuidv4();
        const noExceptionToSave: NoExceptionEntity = {
          id: generatedId,
          code: info.code,
          success: info.success,
          entity: info.entity,
          message: info.message,
          timestamp: info.timestamp,
          host: info.host,
          ip: info.ip,
          path: info.path,
          cookies: info.cookies == undefined ? 'No cookies' : info.cookies,
          userAgent: info.userAgent,
          params: info.params,
          method: info.method,
          body: info.body,
        };
        console.log(noExceptionToSave);
        await queryRunner.manager.save(NoExceptionEntity, noExceptionToSave);
      }
      // ? ------------------------- Transaction Complete ------------------------------//
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log('Cancele transaccion');
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
      console.log('Registre');
    }
  }
}
