import {Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import { ClusterDto } from '../dtos/cluster.dto';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard as CAuthGuard } from '../interceptors/auth.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../classes/IUser';

@Controller('/cluster')
@UseGuards(CAuthGuard)
export class ClusterController {
  constructor(@Inject('clusterProxy') private readonly clusterProxy: ClientProxy) {
  }

  @Post()
  createCluster(@Body() cluster: ClusterDto, @GetUser() user: User) {
    const pattern = { cmd: 'add-cluster' };
    return this.send(user, pattern, cluster);
  }
  @Get()
  listCluster( @GetUser() user: User) {
    const pattern = { cmd: 'list-cluster' };
    return this.send(user, pattern, {});
  }

  @Delete('/:idcluster')
  deleteCluster( @GetUser() user: User,@Param('idcluster') idCluster: string) {
    const pattern = { cmd: 'delete-cluster' };
    return this.send(user, pattern, {idCluster});
  }

  @Get('/:idcluster/install')
  installCluster( @GetUser() user: User,@Param('idcluster') idCluster: string) {
    const pattern = { cmd: 'install-cluster' };
    return this.send(user, pattern, {idCluster});
  }

  @Get('/:idcluster/status')
  getClusterStatus( @GetUser() user: User,@Param('idcluster') idCluster: string) {
    const pattern = { cmd: 'status-cluster' };
    return this.send(user, pattern, {idCluster});
  }
  @Get('/:idcluster/metrics')
  getClusterMetrics( @GetUser() user: User,
                     @Query('range') range: number,
                     @Param('idcluster') idCluster: string) {
    const pattern = { cmd: 'metrics-cluster' };
    return this.send(user, pattern, {idCluster,range});
  }

  @Get('/support-version')
  listSupportVersion( @GetUser() user: User) {
    const pattern = { cmd: 'support-version-cluster' };
    return this.send(user, pattern, {});
  }
  private send(user: any, pattern: any, payload: any) {
    return this.clusterProxy
      .send(pattern, Object.assign({}, payload, { user }));
  }
}
