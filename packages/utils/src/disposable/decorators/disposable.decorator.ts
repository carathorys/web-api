import { DisposeError, ObjectDisposedError } from '../errors';
import { IDisposable } from '../interfaces';

export const Disposable = <T extends { new (...args: any[]): any }>(Base: T) => {
  class DisposableClass extends Base implements IDisposable {
    __isDisposing = false;
    __isDisposed = false;

    dispose() {
      if (this.__isDisposing === true) throw new DisposeError('The object has already disposed!');
      if (this.__isDisposed === true) throw new ObjectDisposedError('The object is already disposing!');

      if (typeof super['dispose'] === 'function') {
        super.dispose();
      }
    }
  }

  return DisposableClass;
};
