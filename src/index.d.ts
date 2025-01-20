import { GeoJSON } from "geojson";

export type TokenIdOr<T> = string | T | FetchError;

export interface FetchError {
  errorMessage: string;
}

export interface Pokedex {
  description: string;
  ProtocolVersion: string;
  instance: ProductInstance;
}

export type Location = GeoJSON.Point;

export interface Facility {
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
  facility: Facility;
  inputInstances: (TransportedInputInstance | LocalInputInstance)[];
  impacts?: Impact[];
  price?: Price;
}

export interface PrintingProcess extends GenericProcess {
  type: "printing";
  knowHow: KnowHow;
  shape: string /* URL */;
}

export interface MillingProcess extends GenericProcess {
  type: "milling";
  knowHow: KnowHow;
}

export interface FreezeDryingProcess extends GenericProcess {
  type: "freezedrying";
  knowHow: KnowHow;
}

export interface BlendingProcess extends GenericProcess {
  type: "blending";
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
  type: "budget" | "is" | "%" | "payin30days" | "payin60days";
  fxRates: string;
  useDuration: number;
  TnC: string;
  deliveryProcess: string;
  resellIF: string;
  warranty?: Warranty;
}

export interface Warranty {
  period: string;
  if-then: string;
  where: string;
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

export interface FoodInstance extends ProductInstanceBase {
  category: "biologic";
  iDs?: ID[];
  nutrients?: FallbackFoodNutrient[];
  format?: string;
  grade?: string;
  size?: string;
  process?: Process;
}

export interface ObjectInstance extends ProductInstanceBase {
  category: "object";
  grade: string;
  size: string;
}

export type ProductInstance = FoodInstance | ObjectInstance;

export interface FallbackFoodNutrient {
  amount: number;
  iD: ID;
}

export interface MachineInstance {
  category: string;
  ownerId: string;
  quantity: number;
  size: string;
  providerSDomain: string;
}

export interface Hr {
  skills: string;
  tasks: string;
  assignee: string;
}

export interface TemperatureRange {
  min: number;
  max: number;
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

export interface ProductInstanceBase {
  type: string;
  ownerId?: string;
  expiryDate?: number;
  bio: boolean;
  quantity: number;
  price?: Price;
  attachments?: InstanceAttachments;
}

export interface KnowHow {
  owner: string;
  licenseFee: Price;
  pricePerOutputQuantity?: number;
  tenders?: Tender[];
  outputInstanceDefaults?: ProductInstance;
  processingSteps?: ProcessingStep[];
  notes: string | object;
}

export interface Tender {
  provider: string;
  status: string;
  price: Price;
  deadline: string;
  place: string;
  furtherConditions: string[];
  notes: string;
}

export interface ProcessingStep {
  readCondition?: string;
  bizStep: string; // GS1 EPCIS2 Business step (e.g., "processing", "packing")
  hrNeeds?: Hr[];
  temperatureRange: TemperatureRange;
  inputMaterialInstances?: InputInstance[];
  UsedMachineInstances?: MachineInstance[];
  notes: string;
}
