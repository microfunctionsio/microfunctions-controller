import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './auth/auth.module';
import {MicroFunctionsModule} from './controllers/micro.functions.module';

import {CliModule} from './cli/cli.module';
import {ClusterModule} from './cluster/cluster.module';
import {HealthModule} from "./health/health.module";


@Module({
  imports: [
    HealthModule,
    AuthModule,
  //  CliModule,
    ClusterModule,
    MicroFunctionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./config.${process.env.NODE_ENV }.env`,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})

export class AppModule {
}
