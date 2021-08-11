import { Injector } from '../injector';
import { ServiceLifetime } from '../parameters';
import { Injectable } from './injectable.decorator';

// tslint:disable:max-classes-per-file
export const injectableTests = describe('Tests', () => {
  it('Should decorate classes', () => {
    @Injectable()
    class MyCustomService {}
    const a = new MyCustomService();
    expect(a).toBeInstanceOf(MyCustomService);
  });

  it('Should resolve ctor parameters', () => {
    class ServiceDependency {
      public value = 1;
    }
    @Injectable()
    class MyCustomService {
      constructor(public service: ServiceDependency) {}
    }
    const a = new MyCustomService(null as any);
    expect(a).toBeInstanceOf(MyCustomService);
    expect(Injector.meta.has(MyCustomService)).toBeTruthy();
  });

  it('Should resolve ctor parameters', () => {
    interface IServiceDefinition {
      value: string;
    }
    @Injectable({ lifetime: ServiceLifetime.Scoped })
    //@ts-ignore
    class ServiceDependency implements IServiceDefinition {
      public value = '1';
    }

    @Injectable({ lifetime: ServiceLifetime.Scoped })
    //@ts-ignore
    class ServiceDependency2 implements IServiceDefinition {
      public value = '1';
    }
    @Injectable()
    class MyCustomService {
      constructor(public service: IServiceDefinition) {}
    }
    const a = new MyCustomService(null as any);
    expect(a).toBeInstanceOf(MyCustomService);
    expect(Injector.meta.has(MyCustomService)).toBeTruthy();
  });
});
