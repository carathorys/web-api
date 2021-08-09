import { ServiceLifetime } from "./service-lifetime";

/**
 * Options for the injectable instance
 */
export interface InjectableParameters {
  lifetime: ServiceLifetime;
  symbol?: Symbol
}
