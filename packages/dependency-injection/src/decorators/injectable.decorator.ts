import 'reflect-metadata';
import { Constructable } from '@furytechs/utils';

import { Injector } from '../injector';
import { InjectableParameters, ServiceLifetime } from '../parameters';

export interface InjectableMetadata {
  dependencies: Constructable<unknown>[];
  options: InjectableParameters;
}

export const DefaultInjectableParameters: InjectableParameters = {
  lifetime: ServiceLifetime.Transient,
};

/**
 * Decorator method for tagging a class as injectable
 *
 * @param parameters The options object
 * @returns void
 */
export const Injectable = (parameters?: InjectableParameters) => {
  return <T extends Constructable<any>>(ctor: T) => {
    const meta = Reflect.getMetadata('design:paramtypes', ctor);
    const metaValue: InjectableMetadata = {
      dependencies:
        (meta &&
          (meta as any[]).map((param) => {
            return param;
          })) ||
        [],
      options: { ...DefaultInjectableParameters, ...parameters },
    };

    Injector.meta.set(ctor, metaValue);
  };
};
