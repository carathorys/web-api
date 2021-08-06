/**
 * @description Simple IDisposable interface to use
 * @memberof IDisposable
 */
export interface IDisposableAsync {
  /**
   * @description Disposes the object asynchronously
   * @returns Promise<void>
   */
  disposeAsync(): Promise<void>;
}
