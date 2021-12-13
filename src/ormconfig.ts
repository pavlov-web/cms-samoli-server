import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'cms',
  entities: [__dirname.replace('/configs', '') + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname.replace('/configs', '') + '/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
