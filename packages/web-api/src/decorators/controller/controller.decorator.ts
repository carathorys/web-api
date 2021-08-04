import { ActionMetadata, ActionParameter } from '../action';

import DecoratorStore from '../decorator-store';

export type ControllerParameter = {
  basePath?: string;
};

export const ControllerMetadata = Symbol('ControllerMetadata');

export const Controller =
  (parameters?: ControllerParameter) =>
  <T extends { new (...args: any[]): {} }>(Base: T) => {
    // @Injectable({ lifetime: 'scoped' })
    // TODO: Dependency injection should be solved!
    class ControllerClass extends Base {}

    DecoratorStore.addControllerMetadata(Base.name, { ...parameters }, ControllerClass, Base);
    const actions = Base.prototype[ActionMetadata] as Map<string, ActionParameter>;
    actions?.forEach((value, key) => {
      DecoratorStore.appendActionMetadata(Base.name, key, value);
    });
    // TODO: `console.log` should not used anywhere
    // console.log('Finished processing Controller data');
    return ControllerClass;
  };