import 'reflect-metadata';
import { ParameterArguments } from './parameter.arguments';

export const ParameterMetadataKey = Symbol('ParameterMetadata');

export type ParameterMetadata = ParameterArguments & {
  parameterIndex: number;
};

export function Parameter(args: ParameterArguments) {
  return (target: any, propertyKey: string, parameterIndex: number) => {
    let params: ParameterMetadata[] = Reflect.getOwnMetadata(ParameterMetadataKey, target, propertyKey) || [];

    params.push({ ...args, parameterIndex: parameterIndex });

    Reflect.defineMetadata(ParameterMetadataKey, params, target, propertyKey);
  };
}