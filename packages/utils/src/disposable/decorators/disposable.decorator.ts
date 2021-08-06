import { DisposeError, ObjectDisposedError } from '../errors';
import { IDisposable } from '../interfaces';
import { DisposableDecoratorParameters } from './disposable-decorator.parameters';

export const Disposable = (parameters?: DisposableDecoratorParameters) => <T extends { new (...args: any[]): any }>(Base: T) => {
  class DisposableClass extends Base implements IDisposable {
    __isDisposing = false;
    __isDisposed = false;

    dispose() {
      if (this.__isDisposing === true) throw new DisposeError('The object has already disposed!');
      this.__isDisposing = true;
      try {
        if (this.__isDisposed === true) throw new ObjectDisposedError('The object is already disposing!');

        if (typeof super['dispose'] === 'function') {
          super.dispose();
        }
         if (parameters?.recursive === true) {
           // TODO: Implement recursive dispose
         }
      } finally {
        this.__isDisposed = true;
        this.__isDisposing = false;
      }
    }
  }

  return DisposableClass;
};
