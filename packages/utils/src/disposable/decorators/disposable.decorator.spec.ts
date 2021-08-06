import { IDisposable } from '../interfaces';
import { Disposable } from './disposable.decorator';

@Disposable()
class MockDisposable implements IDisposable {
  private disposed = false;
  public get resourceDisposed() {
    return this.disposed;
  }

  dispose() {
    this.disposed = true;
  }
}

@Disposable({ recursive: true })
export class MockDecoratedDisposable {
  private internalDisposable = new MockDisposable();
  public get disposableProp(): MockDisposable {
    return this.internalDisposable;
  }
}
export class MockNotDisposable {
  private internalDisposable = new MockDisposable();
  public get disposableProp(): MockDisposable {
    return this.internalDisposable;
  }
}

export const disposableTests = describe('Disposable decorator', () => {
  it('will decorate IDisposable implementation', () => {
    const instance = new MockDisposable();
    expect(instance.resourceDisposed).toBe(false);
    expect(typeof instance.dispose).toBe('function');
  });

  it('will decorate class', () => {
    const instance = new MockDecoratedDisposable();
    expect(typeof (instance as any as IDisposable).dispose).toBe('function');
    expect(instance.disposableProp.resourceDisposed).toBe(false);
  });

  it('will apply not apply to decorated', () => {
    const instance = new MockNotDisposable();
    expect(typeof (instance as any as IDisposable).dispose).toBe('undefined');
    expect(instance.disposableProp.resourceDisposed).toBe(false);
  });

  it('will call `dispose()` in `IDisposable`', () => {
    const instance = new MockDisposable();
    expect(instance.resourceDisposed).toBe(false);
    expect((instance as any).__isDisposed).toBe(false);
    expect((instance as any).__isDisposing).toBe(false);
    const spy = jest.spyOn(instance, 'dispose');
    expect(spy).not.toBeCalled();
    instance.dispose();
    expect((instance as any).__isDisposed).toBe(true);
    expect((instance as any).__isDisposing).toBe(false);
    expect(instance.resourceDisposed).toBe(true);
    expect(spy).toBeCalled();
  });
});
