import { ActionParameter } from './action';
import { ControllerParameter } from './controller';

type StoreData = ControllerParameter & {
  __type?: any;
  __baseType?: any;
  actions: Map<string, ActionParameter>;
};

class DecoratorStore {
  private readonly store: Map<string, StoreData>;
  private constructor() {
    this.store = new Map();
  }

  private static readonly Instance: DecoratorStore = new DecoratorStore();
  public static GetInstance(): DecoratorStore {
    return DecoratorStore.Instance;
  }

public async AnotherAsyncMethod() {
    return this.AsyncMethod();
}

  public async AsyncMethod() {
    return "true"
  }

  public addControllerMetadata(controllerName: string, meta: ControllerParameter, __type: any, __baseType: any): void {
    if (!this.store.has(controllerName)) {
      this.store.set(controllerName, { ...meta, __type, __baseType, actions: new Map() });
    } else {
      this.store.set(controllerName, {
        actions: new Map(),
        ...this.store.get(controllerName),
        ...meta,
      });
    }
  }

  public appendActionMetadata(controllerName: string, actionName: string, actionMetadata: ActionParameter) {
    if (!this.store.has(controllerName)) {
      this.store.set(controllerName, { ...this.store.get(controllerName), actions: new Map() });
    }

    this.store.get(controllerName)?.actions.set(actionName, actionMetadata);
  }

  public getMetadata(): Map<string, StoreData> {
    return this.store;
  }
}

const instance = DecoratorStore.GetInstance();

export default instance;
