import type { BaseApi } from "@/models/api";

export interface AccountApi extends Omit<BaseApi, "data"> {
  data: {
    user: {
      id: number;
      name: string;
      student_no: string;
      department_id: number;
      personal_info: {
        name: string;
        name_en: string;
        student_id: string;
        ntust_email: string;
        mobile_phone: string;
        sex: string;
        college_name: string;
        department_name: string;
        grade: string;
        birthday: string;
      };
      original?: {};
      running_config?: any[];
      avatars?: any[];
      created_at: string;
      updated_at: string;
    };
  };
}
