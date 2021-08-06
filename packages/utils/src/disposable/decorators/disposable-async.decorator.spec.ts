import { DisposeError, ObjectDisposedError } from '../errors';
import { IDisposableAsync } from '../interfaces';
import { DisposableAsync } from './disposable-async.decorator';

class MockDisposable implements IDisposableAsync {
  private disposed = false;
  public get resourceDisposed() {
    return this.disposed;
  }

  async disposeAsync() {
    await setTimeout(() => {
      this.disposed = true;
    }, 1000);
  }
}

@DisposableAsync()
class MockAsyncDisposable implements IDisposableAsync {
  private disposed = false;
  public get resourceDisposed() {
    return this.disposed;
  }

  private internalDisposable = new MockDisposable();
  public get disposableProp(): MockDisposable {
    return this.internalDisposable;
  }
  constructor(private disposeTimeout = 1000) {
  }

  disposeAsync(): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.disposed = true;
        resolve();
      }, this.disposeTimeout);
    });
  }
}

@DisposableAsync({ recursive: true })
export class MockDecoratedDisposable {
  private internalDisposable = new MockAsyncDisposable();
  public get disposableProp(): MockAsyncDisposable {
    return this.internalDisposable;
  }
}
export class MockNotDisposable {
  private internalDisposable = new MockAsyncDisposable();
  public get disposableProp(): MockAsyncDisposable {
    return this.internalDisposable;
  }
}
const validateResource = (
  instance: MockAsyncDisposable,
  resourceDisposedValue: boolean,
  isDisposedValue: boolean,
  isDisposingValue: boolean,
) => {
  expect(instance.resourceDisposed).toBe(resourceDisposedValue);
  expect((instance as any).__isDisposed).toBe(isDisposedValue);
  expect((instance as any).__isDisposing).toBe(isDisposingValue);
};

export const disposableTests = describe('Disposable decorator', () => {
  it('will decorate IDisposableAsync implementation', () => {
    const instance = new MockAsyncDisposable();
    expect(instance.resourceDisposed).toBe(false);
    expect(typeof instance.disposeAsync).toBe('function');
  });

  it('will decorate class', () => {
    const instance = new MockDecoratedDisposable();
    expect(typeof (instance as any as IDisposableAsync).disposeAsync).toBe('function');
    expect(instance.disposableProp.resourceDisposed).toBe(false);

    expect((instance as any as IDisposableAsync).disposeAsync()).rejects.toThrow();
  });

  it('will apply not apply to decorated', () => {
    const instance = new MockNotDisposable();
    expect(typeof (instance as any as IDisposableAsync).disposeAsync).toBe('undefined');
    expect(instance.disposableProp.resourceDisposed).toBe(false);
  });

  it('will call `disposeAsync()` in `IDisposableAsync`', async () => {
    const instance = new MockAsyncDisposable(10);
    validateResource(instance, false, false, false);

    const spy = jest.spyOn(instance, 'disposeAsync');
    expect(spy).not.toBeCalled();

    const promise = instance.disposeAsync().then(() => {
      validateResource(instance, true, true, false);
      expect(spy).toBeCalled();
    });
    validateResource(instance, false, false, true);
    expect(spy).toBeCalled();
    return promise;
  });

  it('`disposeAsync()` throws `DisposeError` when calling while the dispose in progress', async () => {
    const instance = new MockAsyncDisposable(10);
    validateResource(instance, false, false, false);

    const spy = jest.spyOn(instance, 'disposeAsync');
    expect(spy).not.toBeCalled();

    const promise = instance.disposeAsync().then(async () => {
      validateResource(instance, true, true, false);
      expect(spy).toBeCalled();
    });

    expect(instance.disposeAsync()).rejects.toThrow(DisposeError);
    
    await promise;
    
    // validateResource(instance, true, true, false);
    expect(spy).toBeCalled();

    
  });

  it('`disposeAsync()` throws `ObjectDisposed` when calling after the dispose is done', async () => {
    const instance = new MockAsyncDisposable(10);
    validateResource(instance, false, false, false);

    const spy = jest.spyOn(instance, 'disposeAsync');
    expect(spy).not.toBeCalled();

    await instance.disposeAsync();
    validateResource(instance, true, true, false);
    expect(spy).toBeCalled();

    expect(instance.disposeAsync()).rejects.toThrow(ObjectDisposedError);
  });
});
