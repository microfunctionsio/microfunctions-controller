import { ExecutionContext, Injectable, Scope } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable({ scope: Scope.REQUEST })
export class GitHubAuthGuard extends AuthGuard('githubprofile') {
  async canActivate(context: ExecutionContext): Promise<any> {
    const canActivate = await super.canActivate(context);

    return canActivate;
  }
}
