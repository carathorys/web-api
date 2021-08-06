import { DisposeError } from './dispose.error';

export class ObjectDisposedError extends DisposeError {
  constructor(message?: string) {
    super(message);
  }
}
