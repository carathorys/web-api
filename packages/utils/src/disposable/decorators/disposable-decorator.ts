import { DisposeError, ObjectDisposedError } from '../errors';
import { IDisposable } from '../interfaces';
import { DisposableDecoratorParameters } from './disposable-decorator.parameters';

export const Disposable = (parameters?: DisposableDecoratorParameters) => <T extends { new (...args: any[]): any }>(Base: T) => {
  class DisposableClass extends Base implements IDisposable {
    __isDisposing = false;
    __isDisposed = false;

    async dispose() {
      if (this.__isDisposing === true) throw new DisposeError('The object is already disposing!');
      this.__isDisposing = true;
      try {
        if (this.__isDisposed === true) throw new ObjectDisposedError('The object has already disposed!');

        if (typeof super['dispose'] === 'function') {
          await super.dispose();
        }
        if (parameters?.recursive === true) {
          const keys = Object.keys(this);
          for(const key of keys) {
            if (typeof this[key] === 'object' && typeof this[key]['dispose'] === 'function') {
              await this[key].dispose();
            }
          }
        }
      } finally {
        this.__isDisposed = true;
        this.__isDisposing = false;
      }
    }
  }

  return DisposableClass;
};
