import { IsNotEmpty, Max, Min } from 'class-validator';

export class FunctionParams {
  @IsNotEmpty()
  // @Min(6)
  // @Max(16)
  name: string;
  @IsNotEmpty()
  //  @Min(6)
  // @Max(16)
  namespace: string;
}
