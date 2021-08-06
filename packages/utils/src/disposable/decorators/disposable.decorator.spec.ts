import { IDisposable } from '../interfaces';
import { Disposable } from './disposable.decorator';

@Disposable
class MockDisposable implements IDisposable {
  private disposed = false;
  public get resourceDisposed() {
    return this.disposed;
  }

  dispose() {
    this.disposed = true;
  }
}

@Disposable
export class DecoratedDisposable {
  private internalDisposable = new MockDisposable();
  public get disposableProp(): MockDisposable {
    return this.internalDisposable;
  }
}
export class NotDisposable {
  private internalDisposable = new MockDisposable();
  public get disposableProp(): MockDisposable {
    return this.internalDisposable;
  }
}

export const disposableTests = describe('Disposable', () => {
  it('will be created', () => {
    const instance = new MockDisposable();
    expect(instance.resourceDisposed).toBe(false);
    expect(typeof instance.dispose).toBe('function')
    instance.dispose();
    expect(instance.resourceDisposed).toBe(true);
  });

  it("will decorate class", () => {
    const instance = new DecoratedDisposable();
    expect(typeof (instance as any as IDisposable).dispose).toBe('function');
    expect(instance.disposableProp.resourceDisposed).toBe(false)
  })

  it("undecorated class won't have dispose function", () => {
    const instance = new NotDisposable();
    expect(typeof (instance as any as IDisposable).dispose).toBe('undefined');
    expect(instance.disposableProp.resourceDisposed).toBe(false)
  })
});
