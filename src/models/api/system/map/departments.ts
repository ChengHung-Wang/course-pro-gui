import type { BaseApi, College, Department } from "@/models/api";

export interface SystemMapDepartmentsApi extends Omit<BaseApi, "data"> {
  data: {
    colleges: College[];
    departments: Department[];
  };
}
