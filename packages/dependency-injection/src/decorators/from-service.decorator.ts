import 'reflect-metadata';
import { InjectParameters } from '../parameters';
import { InjectMetadata } from '../metadata';

import { Injector } from '../injector';
import { Constructable } from '@furytechs/utils';

const FromServicesMetadataKey = Symbol('FromServicesMetadataKey');

export const Inject =
  (parameters?: InjectParameters) => <T extends Constructable<any>>(target: T, propertyKey: string | symbol, parameterIndex: number) => {
    let existingRequiredParameters: InjectMetadata[] =
      Reflect.getOwnMetadata(FromServicesMetadataKey, target, propertyKey) || [];

    existingRequiredParameters.push({ parameterIndex, symbol: parameters?.symbol });
    //@ts-ignore
    const defined = Injector.meta.has(target);
    //@ts-ignore
    console.log({ parameters, target, propertyKey, parameterIndex }, defined);

    Reflect.defineMetadata(FromServicesMetadataKey, existingRequiredParameters, target, propertyKey);
  };
