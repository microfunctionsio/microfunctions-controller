import { Module } from '@nestjs/common';
import { ClusterController } from './cluster.controller';
import { getAuthProxyFactory, getClusterProxyFactory} from '../factorys/proxy.factory';

@Module({
  controllers: [ClusterController],
  providers: [getClusterProxyFactory(), getAuthProxyFactory()],

})
export class ClusterModule {

}
