import type { BaseApi } from "@/models/api";

export interface SystemMapLanguagesApi extends Omit<BaseApi, "data"> {
  data: {
    id: number;
    name: string;
    country_id: number;
    country: {
      id: number;
      continent_id: number;
      island_id: number;
      name: string;
      native_name: string;
      flag: string;
      iso2: string;
      iso3: string;
      island: {
        id: number;
        continent_id: number;
        name: string;
        icon: null; // TODO
      };
      continent: {
        id: number;
        name: string;
        icon: null; // TODO
      };
    };
  }[];
}
