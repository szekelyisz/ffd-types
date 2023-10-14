import { GeoJSON } from "geojson";

export type UrlOr<T> = string | T | FetchError;

export interface FetchError {
  errorMessage: string;
}

export interface Pokedex {
  description: string;
  contract: string;
  token: string;
  feedchainVersion: string;
  sale: SaleProcess;
}

export type Process =
  | PrintingProcess
  | MillingProcess
  | FreezeDryingProcess
  | BlendingProcess
  | SaleProcess
  | HarvestProcess;

export interface GenericProcess {
  timestamp: number;
  duration?: number;
  location: GeoJSON.Point;
  temperatureRange: TemperatureRange;
  inputInstances: (TransportedInputInstance | LocalInputInstance)[];
  impacts?: Impact[];
}

export interface PrintingProcess extends GenericProcess {
  type: "printing";
  machineInstance: MachineInstance;
  knowHow: KnowHow;
  shape: string /* URL */;
}

export interface MillingProcess extends GenericProcess {
  type: "milling";
  knowHow: KnowHow;
  machineInstance: MachineInstance;
}

export interface FreezeDryingProcess extends GenericProcess {
  type: "freezedrying";
  knowHow: KnowHow;
  machineInstance: MachineInstance;
}

export interface BlendingProcess extends GenericProcess {
  type: "blending";
  machineInstance: MachineInstance;
  knowHow: KnowHow;
}

export interface SaleProcess extends GenericProcess {
  type: "sale";
  price: Price;
}

export interface HarvestProcess extends GenericProcess {
  type: "harvest";
}

export interface Price {
  amount: number;
  currency: string;
}

export interface GenericInputInstance {
  instance: UrlOr<ProductInstance>;
  /* x 100 (g|ml) */
  quantity: number;
}
export type LocalInputInstance = GenericInputInstance;

export interface TransportedInputInstance extends GenericInputInstance {
  transport: Transport;
}

export type InputInstance = LocalInputInstance | TransportedInputInstance;

export interface Transport {
  method: TransportMethod;
  fuelType: "hydrogen" | "electric" | "diesel" | "petrol" | "kerosene";
  weight: number;
  deparetureTime: number;
  duration: number;
}

export type TransportMethod = "air" | "sea" | "land";

export type ProductInstance = FoodInstance | CartridgeInstance;

export interface FoodInstance {
  category: "food";
  type: string;
  iDs?: IDs;
  nutrients?: FallbackFoodNutrient[];
  ownerId?: string;
  expiryDate?: number;
  format?: string;
  bio: boolean;
  grade?: string;
  size?: string;
  process?: Process;
}

export interface CartridgeInstance {
  category: "cartridge";
  ownerId: string;
  bio: boolean;
  grade: string;
  size: string;
}

export interface FallbackFoodNutrient {
  amount: number;
  iDs: IDs;
}

export interface MachineInstance {
  category: string;
  ownerId: string;
  quantity: number;
  size: string;
  hr: Hr;
  providerSDomain: string;
}

export interface Hr {
  tasks: string;
  assignee: string;
}

export interface TemperatureRange {
  min: number;
  max: number;
}

export interface KnowHow {
  owner: string;
  hash: string;
  inputs: string;
  outputs: string;
  licenseFee: Price;
  note?: string | object;
}

export interface GenericImpact {
  ownerId: string;
  format: string;
  /* x (g|l) */
  quantity: number;
}

export type Impact = CarbonImpact | WaterImpact;

export interface CarbonImpact extends GenericImpact {
  category: "carbon";
}

export interface WaterImpact extends GenericImpact {
  category: "water";
}

export interface IDs {
  registry: string;
  id: number;
}
