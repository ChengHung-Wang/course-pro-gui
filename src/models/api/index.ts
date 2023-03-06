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

export interface College {
  id: number;
  name_en: string;
  name_zh: string;
  no: number;
}

export interface Department {
  college_id: number;
  id: number;
  name_en: string;
  name_zh: string;
  prefix_no: number;
}
