// The base interface of an Course Pro API response.
export interface BaseApi {
  success: boolean;
  message?: string; // This only appears in errors
  data: Record<string, any>;
}

export enum GpaNames {
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D",
  "E",
  "X",
}
