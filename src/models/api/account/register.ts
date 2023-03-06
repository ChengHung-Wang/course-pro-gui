import type { BaseApi } from "@/models/api";
import type { College, Department } from "@/models/identity";

export interface AccountForgetApi extends Omit<BaseApi, "data"> {
  data: {
    user: {
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
    };
    token: string;
  };
}
