import { Controller, Get, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MicroFunctionsModule } from './controllers/micro.functions.module';
import { DNSHealthIndicator, HealthCheck, HealthCheckService, TerminusModule } from '@nestjs/terminus';
import { CliModule } from './cli/cli.module';
import { ClusterModule } from './cluster/cluster.module';

const environment = 'local';
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dns: DNSHealthIndicator,
  ) {
  }

  @Get()
  @HealthCheck()
  healthCheck() {
    return this.health.check([
      async () => this.dns.pingCheck('google', 'https://google.com'),
    ]);
  }
}
@Module({
  imports: [
    TerminusModule,
    AuthModule,
    CliModule,
    ClusterModule,
    MicroFunctionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./config.${process.env.NODE_ENV || environment}.env`,
    }),
  ],
  controllers: [HealthController],
  providers: [],
  exports: [],
})

export class AppModule {
}
