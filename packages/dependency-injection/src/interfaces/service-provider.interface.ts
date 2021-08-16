import { Constructable } from "@furytechs/utils";

export interface IServiceProvider {
  getInstance<T>() : T;
  get(T: Constructable<unknown>): any;
}
