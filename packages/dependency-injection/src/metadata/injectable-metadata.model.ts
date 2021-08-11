import { Constructable } from "@furytechs/utils";
import { InjectableParameters } from "../parameters";

export interface InjectableMetadata {
    dependencies: Constructable<unknown>[];
    options: InjectableParameters;
  }
  