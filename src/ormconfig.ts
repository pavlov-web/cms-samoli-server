import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
  type: 'postgres',
  url: 'postgres://root:root@localhost:5432/cms',
  entities: [__dirname.replace('/configs', '') + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  // migrations: [__dirname.replace('/configs', '') + '/migrations/*{.ts,.js}'],
  // cli: {
  //   migrationsDir: 'src/migrations',
  // },
};

export default config;
