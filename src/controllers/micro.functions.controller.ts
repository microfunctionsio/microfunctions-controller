import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '../interceptors/auth.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../classes/IUser';
import { NamespaceDto } from '../dtos/namespace.dto';
import { catchError, map } from 'rxjs/operators';
import { FunctionDto } from '../dtos/function.dto';

@Controller()
@UseGuards(AuthGuard)
export class MicroFunctionsController {
  constructor(
    @Inject('microFunctionsProxy') private readonly clientProxy: ClientProxy,
  ) {}

  /***********************************************
   * functions
   *******************************************/

  @Get('/namespaces/:idnamespaces/functions')
  @UseGuards(AuthGuard)
  getFunctions(
    @GetUser() user: User,
    @Param('idnamespaces') idNamespace: string,
  ) {
    const pattern = { cmd: 'get-functions' };
    return this.send(user, pattern, { idNamespace });
  }

  @Get('/namespaces/:idnamespaces/functions/:idfunctions')
  @UseGuards(AuthGuard)
  getFunction(
    @Param('idfunctions') idFunctions: string,
    @GetUser() user: User,
    @Param('idnamespaces') idNamespace: string,
  ) {
    const pattern = { cmd: 'get-function' };
    return this.send(user, pattern, { idNamespace, idFunctions });
  }

  @Get('/namespaces/:idnamespaces/functions/:idfunctions/metrics')
  @UseGuards(AuthGuard)
  getFunctionMetrics(
    @Query('range') range: number,
    @Param('idfunctions') idFunctions: string,
    @GetUser() user: User,
    @Param('idnamespaces') idNamespace: string,
  ) {
    const pattern = { cmd: 'get-functions-metrics' };
    return this.send(user, pattern, { idNamespace, idFunctions, range });
  }

  @Post('/namespaces/:idnamespaces/functions/:idfunctions/logs')
  @UseGuards(AuthGuard)
  getFunctionLogs(
    @Body() body: any,
    @Param('idfunctions') idFunctions: string,
    @GetUser() user: User,
    @Param('idnamespaces') idNamespace: string,
  ) {
    const pattern = { cmd: 'get-functions-logs' };
    return this.send(user, pattern, {
      idNamespace,
      idFunctions,
      logstimestamps: body.logstimestamps,
    });
  }

  @Get('/namespaces/:idnamespaces/functions/:idfunctions/status')
  @UseGuards(AuthGuard)
  getFunctionStatus(
    @Param('idfunctions') idFunctions: string,
    @GetUser() user: User,
    @Param('idnamespaces') idNamespace: string,
  ) {
    const pattern = { cmd: 'get-functions-status' };
    return this.send(user, pattern, { idNamespace, idFunctions });
  }

  @Delete('/namespaces/:idnamespaces/functions/:idfunctions')
  @UseGuards(AuthGuard)
  deleteFunction(
    @Param('idfunctions') idFunctions: string,
    @GetUser() user: User,
    @Param('idnamespaces') idNamespace: string,
  ) {
    const pattern = { cmd: 'delete-function' };
    return this.send(user, pattern, { idNamespace, idFunctions });
  }

  @Post('/namespaces/:idnamespaces/functions')
  @UseGuards(AuthGuard)
  createFunction(
    @Body() functionDto: FunctionDto,
    @GetUser() user: User,
    @Param('idnamespaces') idNamespace: string,
  ) {
    const pattern = { cmd: 'post-function' };
    return this.send(
      user,
      pattern,
      Object.assign(functionDto, { idNamespace }),
    );
  }

  @Put('/namespaces/:idnamespaces/functions/:idfunctions')
  @UseGuards(AuthGuard)
  updateFunction(
    @Body() functionDto: FunctionDto,
    @GetUser() user: User,
    @Param('idnamespaces') idNamespace: string,
    @Param('idfunctions') idFunctions: string,
  ) {
    const pattern = { cmd: 'put-function' };
    return this.send(
      user,
      pattern,
      Object.assign(functionDto, { idNamespace, idFunctions }),
    );
  }

  @Put('/namespaces/:idnamespaces/functions/:idfunctions/scale')
  @UseGuards(AuthGuard)
  scaleFunction(
    @Body() functionDto: FunctionDto,
    @GetUser() user: User,
    @Param('idnamespaces') idNamespace: string,
    @Param('idfunctions') idFunctions: string,
  ) {
    const pattern = { cmd: 'put-functions-scale' };
    return this.send(
      user,
      pattern,
      Object.assign(functionDto, { idNamespace, idFunctions }),
    );
  }
  @Get('/namespaces/:idnamespaces/functions/:idfunctions/stop')
  @UseGuards(AuthGuard)
  stopFunction(
    @GetUser() user: User,
    @Param('idnamespaces') idNamespace: string,
    @Param('idfunctions') idFunctions: string,
  ) {
    const pattern = { cmd: 'functions-stop' };
    return this.send(
      user,
      pattern,
      Object.assign({}, { idNamespace, idFunctions }),
    );
  }

  @Get('/namespaces/:idnamespaces/functions/:idfunctions/start')
  @UseGuards(AuthGuard)
  startFunction(
    @GetUser() user: User,
    @Param('idnamespaces') idNamespace: string,
    @Param('idfunctions') idFunctions: string,
  ) {
    const pattern = { cmd: 'functions-start' };
    return this.send(
      user,
      pattern,
      Object.assign({}, { idNamespace, idFunctions }),
    );
  }



  /***********************************************
   * END Function
   *******************************************/

  /***********************************************
   * Namespaces
   *******************************************/

  @Get('/namespaces/:idnamespaces')
  @UseGuards(AuthGuard)
  getNamespacesById(@GetUser() user: any, @Param('idnamespaces') id: string) {
    const pattern = { cmd: 'get-namespaces-id' };
    return this.send(user, pattern, { id });
  }

  @Get('/namespaces/:idnamespaces/metrics')
  @UseGuards(AuthGuard)
  getNamespaceMetrics(@GetUser() user: any,
                      @Query('range') range: number,
                      @Param('idnamespaces') id: string) {
    const pattern = { cmd: 'get-namespace-metrics' };
    return this.send(user, pattern, { id , range});
  }

  @Delete('/namespaces/:idnamespaces')
  @UseGuards(AuthGuard)
  deleteNamespacesById(
    @GetUser() user: any,
    @Param('idnamespaces') id: string,
  ) {
    const pattern = { cmd: 'delete-namespaces-id' };
    return this.send(user, pattern, { id });
  }

  @Post('/namespaces')
  @UseGuards(AuthGuard)
  createNamespace(@Body() namespace: NamespaceDto, @GetUser() user: User) {
    const pattern = { cmd: 'post-namespaces' };
    return this.send(user, pattern, namespace);
  }

  @Get('/namespaces')
  @UseGuards(AuthGuard)
  getNamespaces(@GetUser() user: any) {
    const pattern = { cmd: 'get-namespaces' };
    return this.send(user, pattern, {});
  }

  /***********************************************
   * END Namespaces
   *******************************************/

  private send(user: any, pattern: any, payload: any) {
    return this.clientProxy
      .send(pattern, Object.assign({}, payload, { user })).pipe(catchError(err => console.log));
  }
}
