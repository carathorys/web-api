import { using } from './using';
import {
  MockAsyncDisposable,
  MockDecoratedDisposable,
  MockNotDisposable,
  validateResource,
} from './decorators/disposable.decorator.spec';
import { DisposeError } from './errors';

export const usingTests = describe('Using tests', () => {
  it('should work with `IDisposable`', async () => {
    await using(new MockAsyncDisposable(10), async (asyncDisposable) => {
      validateResource(asyncDisposable, false, false, false);
    });
  });

  it('should work with `Disposable` decorated classes', async () => {
    await using(new MockDecoratedDisposable(), async (asyncDisposable) => {
      validateResource(asyncDisposable, undefined, false, false);
    });
  });

  it('should work with `Disposable` decorated classes', async () => {
    const obj = {
      us: async () => {
        await using(new MockNotDisposable(), async (asyncDisposable) => {
          validateResource(asyncDisposable, undefined, false, false);
        });
      },
    };
    const spy = jest.spyOn(obj, 'us');
    expect(obj.us()).rejects.toThrowError(DisposeError);
    expect(spy).toBeCalled();
  });
});
