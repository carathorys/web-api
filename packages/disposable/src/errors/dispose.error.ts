export class DisposeError extends TypeError {
  constructor(message?: string, protected readonly parameters?: any[]) {
    super(message);
  }
}
