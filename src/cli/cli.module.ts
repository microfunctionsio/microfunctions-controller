import { Module } from '@nestjs/common';
import { CliControllers } from './cli.controllers';
import { getAuthProxyFactory } from '../factorys/proxy.factory';

@Module({
  controllers: [CliControllers],
  providers:[getAuthProxyFactory()]
})
export class CliModule {

}
