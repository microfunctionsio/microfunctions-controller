import { Runtime } from './runtime';

export interface FunctionOut {
  id: string;
  name: string;
  memory: string;
  idNamespace: string;
  executedName: string;
  runtime: Runtime;
  createdAt: Date;
  updatedAt: Date;
}
