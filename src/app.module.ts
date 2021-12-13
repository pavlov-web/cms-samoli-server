import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './modules/file/file.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { ServiceModule } from './modules/service/service.module';
import { AuthMiddleware } from './modules/auth/middlewares/auth.middleware';
import { UserModule } from './modules/user/user.module.js';
import { AuthModule } from './modules/auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    AuthModule,
    UserModule,
    FileModule,
    PortfolioModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
