import { ParameterType } from "./parameter.type";

export interface ParameterArguments {
  from: 'header' | 'query' | 'path' | 'payload';
  alias: string;
  required?: boolean;
  type: ParameterType;
}
