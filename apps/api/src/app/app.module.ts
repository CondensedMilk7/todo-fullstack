import { Global, Module, ValidationPipe } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TodoItem } from './todo/todo-item.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '../environments/environment';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import path = require('path');

@Global()
@Module({
  imports: [
    // For testing...

    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: `../../.env.${process.env.NODE_ENV}`,
    // }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'sqlite',
    //       database: config.get<string>('DB_NAME'),
    //       synchronize: true,
    //       entities: [],
    //     };
    //   },
    // }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.join(
        __dirname,
        'apps',
        'api',
        'src',
        'database',
        'db.sqlite'
      ),
      entities: [TodoItem, User],
      synchronize: true,
    }),
    JwtModule.register({
      secret: environment.jwt.secret,
      signOptions: { expiresIn: environment.jwt.expiresIn },
    }),
    TodoModule,
    AuthModule,
  ],
  exports: [JwtModule],
  controllers: [],
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
})
export class AppModule {}
