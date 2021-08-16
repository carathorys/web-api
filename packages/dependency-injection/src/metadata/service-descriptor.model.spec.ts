import { ServiceDescriptorError } from '../errors';
import { ServiceLifetime } from '../parameters';
import { ServiceDescriptor } from './service-descriptor.model';

const Service = Symbol('MyService');

class ServiceImplementation {
  getString(): string {
    return 'getString()';
  }
}

export const serviceDescriptorTests = describe('ServiceDescriptor', () => {
  it('should be able to construct', () => {
    const descriptor = new ServiceDescriptor({
      lifetime: ServiceLifetime.Singleton,
      serviceType: Service,
      implementationFactory: () => new ServiceImplementation(),
    });
    expect(descriptor).toBeTruthy();
    expect(descriptor.serviceType).toBeTruthy();
  });

  it('should be able to construct', () => {
    const descriptor = new ServiceDescriptor({
      lifetime: ServiceLifetime.Singleton,
      serviceType: Service,
      implementationInstance: new ServiceImplementation(),
    });
    expect(descriptor).toBeTruthy();
    expect(descriptor.serviceType).toBeTruthy();
  });

  it('should be able to construct', () => {
    const descriptor = new ServiceDescriptor({
      lifetime: ServiceLifetime.Singleton,
      serviceType: Service,
      implementationType: ServiceImplementation,
    });
    expect(descriptor).toBeTruthy();
    expect(descriptor.serviceType).toBeTruthy();
  });

  it('should be able to construct', () => {
    const descriptor = new ServiceDescriptor({
      lifetime: ServiceLifetime.Singleton,
      implementationType: ServiceImplementation,
    });
    expect(descriptor).toBeTruthy();
    expect(descriptor.serviceType).toBeTruthy();
  });

  it('should be able to construct', () => {
    const descriptor = new ServiceDescriptor({
      lifetime: ServiceLifetime.Singleton,
      implementationInstance: new ServiceImplementation(),
    });
    expect(descriptor).toBeTruthy();
    expect(descriptor.serviceType).toBeTruthy();
  });

  it('should be able to construct', () => {
    const descriptor = new ServiceDescriptor({
      lifetime: ServiceLifetime.Singleton,
      implementationFactory: () => new ServiceImplementation(),
    });
    expect(descriptor).toBeTruthy();
    expect(descriptor.serviceType).toBeDefined();
  });

  it('should be able to construct', () => {
    expect(
      () =>
        new ServiceDescriptor({
          lifetime: ServiceLifetime.Scoped,
          implementationFactory: () => new ServiceImplementation(),
        }),
    ).toThrowError(ServiceDescriptorError);
  });
});
