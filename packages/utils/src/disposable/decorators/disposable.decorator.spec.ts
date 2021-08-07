import { DisposeError, ObjectDisposedError } from '../errors';
import { IDisposable } from '../interfaces';
import { Disposable } from './disposable.decorator';

export class MockDisposable implements IDisposable {
  private disposed = false;
  public get resourceDisposed() {
    return this.disposed;
  }
  constructor(private disposeTimeout = 1000) {
  }

  async dispose() {
    await setTimeout(() => {
      this.disposed = true;
    }, this.disposeTimeout);
  }
}

@Disposable()
export class MockAsyncDisposable implements IDisposable {
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

  dispose(): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.disposed = true;
        resolve();
      }, this.disposeTimeout);
    });
  }
}

@Disposable({ recursive: true })
export class MockDecoratedDisposable {
  private internalDisposable = new MockAsyncDisposable(10);
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

export const validateResource = (
  instance: any,
  resourceDisposedValue: boolean | undefined,
  isDisposedValue: boolean,
  isDisposingValue: boolean,
) => {
  expect(instance.resourceDisposed).toBe(resourceDisposedValue);
  expect(instance.__isDisposed).toBe(isDisposedValue);
  expect(instance.__isDisposing).toBe(isDisposingValue);
};

export const disposableTests = describe('Disposable decorator', () => {
  it('will decorate IDisposable implementation', () => {
    const instance = new MockAsyncDisposable();
    expect(instance.resourceDisposed).toBe(false);
    expect(typeof instance.dispose).toBe('function');
  });

  it('will decorate class', () => {
    const instance = new MockDecoratedDisposable();
    expect(typeof (instance as any as IDisposable).dispose).toBe('function');
    validateResource(instance, undefined, false, false);
    expect(instance.disposableProp.resourceDisposed).toBe(false);

    expect((instance as any as IDisposable).dispose());
    
  });

  it('will apply not apply to decorated', () => {
    const instance = new MockNotDisposable();
    expect(typeof (instance as any as IDisposable).dispose).toBe('undefined');
    expect(instance.disposableProp.resourceDisposed).toBe(false);
  });

  it('will call `dispose()` in `IDisposable`', async () => {
    const instance = new MockAsyncDisposable(10);
    validateResource(instance, false, false, false);

    const spy = jest.spyOn(instance, 'dispose');
    expect(spy).not.toBeCalled();

    const promise = instance.dispose().then(() => {
      validateResource(instance, true, true, false);
      expect(spy).toBeCalled();
    });
    validateResource(instance, false, false, true);
    expect(spy).toBeCalled();
    return promise;
  });

  it('`dispose()` throws `DisposeError` when calling while the dispose in progress', async () => {
    const instance = new MockAsyncDisposable(10);
    validateResource(instance, false, false, false);

    const spy = jest.spyOn(instance, 'dispose');
    expect(spy).not.toBeCalled();

    const promise = instance.dispose().then(async () => {
      validateResource(instance, true, true, false);
      expect(spy).toBeCalled();
    });

    expect(instance.dispose()).rejects.toThrow(DisposeError);
    
    await promise;
    
    validateResource(instance, true, true, false);
    expect(spy).toBeCalled();    
  });

  it('`dispose()` throws `ObjectDisposed` when calling after the dispose is done', async () => {
    const instance = new MockAsyncDisposable(10);
    validateResource(instance, false, false, false);

    const spy = jest.spyOn(instance, 'dispose');
    expect(spy).not.toBeCalled();

    await instance.dispose();
    validateResource(instance, true, true, false);
    expect(spy).toBeCalled();

    expect(instance.dispose()).rejects.toThrow(ObjectDisposedError);
    validateResource(instance, true, true, false);
  });
});
