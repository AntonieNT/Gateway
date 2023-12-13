import { DataSource } from 'typeorm';
import { ExceptionEntity } from 'src/common/entities/exception.entity';
import { NoExceptionEntity } from 'src/common/entities/no-exception.entity'; 
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.GW_DB_HOST,
        port: +process.env.GW_DB_PORT,
        username: process.env.GW_DB_USERNAME,
        password: process.env.GW_DB_PASSWORD,
        database: process.env.GW_DB_NAME,
        entities: [ExceptionEntity, NoExceptionEntity],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
