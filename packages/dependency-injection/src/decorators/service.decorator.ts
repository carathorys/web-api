import 'reflect-metadata';

import { Constructable } from '@furytechs/utils';

import { ServiceDecoratorParameters } from '../parameters';

import { ServiceDescriptor } from '../metadata';

/**
 * Decorator method for tagging a class as injectable
 *
 * @param parameters The options object
 * @returns void
 */
export const Service = <T>(parameters: ServiceDecoratorParameters<T>) => {
  return <T extends Constructable<any>>(ctor: T) => {
    const meta = Reflect.getMetadata('design:paramtypes', ctor);
    const metaValue = new ServiceDescriptor(parameters);
    // console.log(meta, metaValue);
  };
};
