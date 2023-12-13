import { DataSource } from 'typeorm';
import { ExceptionEntity } from './entities/exception.entity'; 
export const globalProviders = [
  {
    provide: 'EXCEPTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ExceptionEntity),
    inject: ['DATA_SOURCE'],
  }
];
