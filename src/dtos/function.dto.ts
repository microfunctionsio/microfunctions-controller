import { SourceCodeDto } from './sourceCode.dto';
import { Runtime } from './runtime';

export class FunctionDto {
  name: string;
  memory: string;
  idUser: string;
  idNamespace: string;
  executedName: string;
  runtime: Runtime;
  replicas: number;
  sourceCode: SourceCodeDto;
  id: string|undefined;
}
