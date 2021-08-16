import { Constructable } from '@furytechs/utils';

import { IServiceProvider } from '../interfaces';
import { ServiceLifetime } from './service-lifetime.enum';

export type ImplementationFactory<T> = (provider: IServiceProvider) => T;

export interface ServiceDecoratorParameters<T> {
  lifetime: ServiceLifetime;
  provideIn?: Constructable<unknown> | 'root' | 'any';
  implementationType?: Constructable<T>;
  implementationInstance?: T;
  implementationFactory?: ImplementationFactory<T>;
  serviceType?: Symbol;
}
