import { DisposeError, ObjectDisposedError } from '../errors';
import { IDisposableAsync } from '../interfaces';
import { DisposableDecoratorParameters } from './disposable-decorator.parameters';

export const DisposableAsync = (parameters?: DisposableDecoratorParameters) => <T extends { new (...args: any[]): any }>(Base: T) => {
  class DisposableAsyncClass extends Base implements IDisposableAsync {
    __isDisposing = false;
    __isDisposed = false;

    async disposeAsync() {
      if (this.__isDisposing === true) throw new DisposeError('The object is already disposing!');
      this.__isDisposing = true;
      try {
        if (this.__isDisposed === true) throw new ObjectDisposedError('The object has already disposed!');

        if (typeof super['disposeAsync'] === 'function') {
          await super.disposeAsync();
        }
        if (parameters?.recursive === true) {
          throw new Error("Not implemented yet!")
          // TODO: recursive logic implementation 
        }
      } finally {
        this.__isDisposed = true;
        this.__isDisposing = false;
      }
    }
  }

  return DisposableAsyncClass;
};
