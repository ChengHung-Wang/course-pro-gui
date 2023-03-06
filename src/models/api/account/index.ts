import type { BaseApi, College, Department } from "@/models/api";

export interface PersonalInfo {
  name: string;
  name_en: string;
  student_id: string;
  ntust_email: string;
  mobile_phone: string;
  sex: string;
  grade: string;
  birthday: string;
  college: College;
  department: Department;
}

export interface AccountApi extends Omit<BaseApi, "data"> {
  data: {
    user: {
      id: number;
      name: string;
      student_no: string;
      department_id: number;
      personal_info: PersonalInfo;
      original?: {};
      running_config?: any[];
      avatars?: any[];
      created_at: string;
      updated_at: string;
    };
  };
}
