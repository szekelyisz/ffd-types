import { type GeoJSON } from "geojson";

export type TokenId = `0x${string}`;

export type TokenIdOr<T> = TokenId | (T & { _tokenId?: TokenId });

export type Priced<T> = T & { price: Price };

export interface Pokedex {
  description: string;
  contract: string;
  token: string;
  feedchainVersion: string;
  instance: Priced<ProductInstance>;
}

export type Location = GeoJSON.Point;

export interface Site {
  label?: string;
  location: Location;
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
  site: Site;
  temperatureRange: TemperatureRange;
  inputInstances: (TransportedInputInstance | LocalInputInstance)[];
  impacts?: Impact[];
  price?: Price;
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

export interface SaleProcess extends Priced<GenericProcess> {
  type: "sale";
}

export interface HarvestProcess extends GenericProcess {
  type: "harvest";
}

export interface Price {
  amount: number;
  currency: string;
  type: "budget" | "is" | "%" | "payin30days" | "payin60days";
}

export interface GenericInputInstance {
  instance: TokenIdOr<ProductInstance>;
  quantity: number; // g|ml
}
export interface LocalInputInstance extends GenericInputInstance {
  type: "local";
}

export interface TransportedInputInstance extends GenericInputInstance {
  type: "transported";
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

export interface ProductInstanceBase {
  type: string;
  ownerId?: string;
  expiryDate?: number;
  bio: boolean;
  quantity: number;
}

export interface FoodInstance extends ProductInstanceBase {
  category: "food";
  iDs?: ID[];
  nutrients?: FallbackFoodNutrient[];
  format?: string;
  grade?: string;
  size?: string;
  process?: Process;
}

export interface CartridgeInstance extends ProductInstanceBase {
  category: "cartridge";
  grade: string;
  size: string;
}

export type ProductInstance = FoodInstance | CartridgeInstance;

export interface FallbackFoodNutrient {
  amount: number;
  iD: ID;
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

export interface ID {
  registry: string;
  id: string;
}
