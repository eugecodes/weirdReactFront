import type { Optional } from "../utils/types";

export interface ApiError {
  uuid?: string;
  code: string;
  source: Optional<string>;
  field: Optional<string>;
  message: string;
}
