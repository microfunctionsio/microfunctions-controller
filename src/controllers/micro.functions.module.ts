import { Module } from '@nestjs/common';

import {
  getAuthProxyFactory,
  getMicroFunctionsProxyFactory,
} from '../factorys/proxy.factory';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { MicroFunctionsController } from './micro.functions.controller';

@Module({
  providers: [getMicroFunctionsProxyFactory(), getAuthProxyFactory(), LoggingInterceptor],
  controllers: [MicroFunctionsController],
})
export class MicroFunctionsModule {}
