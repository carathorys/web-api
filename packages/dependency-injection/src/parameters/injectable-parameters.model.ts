import { ServiceLifetime } from './service-lifetime.enum';

/**
 * Options for the injectable instance
 */
export interface InjectableParameters {
  lifetime: ServiceLifetime;
  symbol?: Symbol;
}
