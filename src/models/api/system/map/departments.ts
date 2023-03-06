import type { BaseApi } from "@/models/api";

export interface College {
  id: number;
  no: number;
  name_zh: string;
  name_en: string;
}

export interface Departments {
  id: number;
  prefix_no: string;
  name_zh: string;
  name_en: string;
  college_id: number;
}

export interface SystemMapDepartmentsApi extends Omit<BaseApi, "data"> {
  data: {
    colleges: College[];
    departments: Departments[];
  };
}
