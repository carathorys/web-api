import { Constructable } from '@furytechs/utils';
import { IServiceProvider } from '../interfaces';
import { ServiceLifetime } from '../parameters';

type ImplementationFactory<T> = (provider: IServiceProvider) => T;
type ConstructorParameters<T> = {
  lifetime: ServiceLifetime;
  serviceType: Constructable<T>;
  implementationType?: Constructable<T>;
  implementationInstance?: T;
  implementationFactory?: ImplementationFactory<T>;
};

export class ServiceDescriptor {
  public readonly serviceLifetime: ServiceLifetime;
  public readonly serviceType: Constructable<unknown>;
  public readonly implementationType?: Constructable<unknown>;
  public readonly implementationInstance?: unknown;
  public readonly implementationFactory?: ImplementationFactory<unknown>;

  /**
   *
   */
  constructor({
    lifetime,
    serviceType,
    implementationFactory,
    implementationInstance,
    implementationType,
  }: ConstructorParameters<unknown>) {
    this.serviceLifetime = lifetime;
    this.serviceType = serviceType;
    this.implementationType = implementationType;
    this.implementationInstance = implementationInstance;
    this.implementationFactory = implementationFactory;
  }

  public getImplementationType(): Constructable<object> | undefined {
    if (this.implementationType) return this.implementationType;
    else if (this.implementationInstance) return (this.implementationInstance as any)['constructor'];
    else if (this.implementationFactory) return this.implementationFactory.prototype;
    return undefined;
  }

  /**
   * @description Creates the service descriptor from a singleton instance
   * @param serviceType ServiceType to use
   * @param implementationInstance Instance to register
   * @returns {ServiceDescriptor} service descriptor
   */
  public static Singleton<T>(params: Omit<ConstructorParameters<T>, 'lifetime'>): ServiceDescriptor {
    const { serviceType, implementationInstance } = params;
    if (serviceType == null) {
      throw new Error('`serviceType` needs to be provided');
    }

    if (implementationInstance == null) {
      throw new Error('`implementationInstance` needs to be provided');
    }

    return new ServiceDescriptor({ serviceType, implementationInstance, lifetime: ServiceLifetime.Singleton });
  }
}
