import { Injectable } from './injectable.decorator'

// tslint:disable:max-classes-per-file
export const injectableTests = describe('Tests', () => {
  it('Should decorate classes', () => {
    @Injectable()
    class MyCustomService {}
    const a = new MyCustomService()
    expect(a).toBeInstanceOf(MyCustomService)
  })

  it('Should resolve ctor parameters', () => {
    class ServiceDependency {
      public value = 1
    }

    @Injectable()
    class MyCustomService {
      constructor(public service: ServiceDependency) {}
    }
    const a = new MyCustomService(null as any)
    expect(a).toBeInstanceOf(MyCustomService)
  })
})
