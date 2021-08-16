import { Injector } from '../injector';
// import { Inject } from './inject.decorator';
// import { Injectable } from './injectable.decorator';

export const FromServicesTests = describe('@FromService decorator', () => {
  it('should decorate parameters', () => {
    // @Injectable()
    // class Service {
    //   public readonly value: string = 'Service value';
    // }
    // class MyClass {
    //   constructor(@Inject() private readonly parameter: Service) {}
    //   write() {
    //     //@ts-ignore
    //     console.log(this.parameter);
    //   }
    //   read(@Inject() parameter: Service): void {
    //     //@ts-ignore
    //     console.log(parameter);
    //   }
    // }

    const injector = new Injector();
    expect(injector).toBeTruthy();
  });
});
