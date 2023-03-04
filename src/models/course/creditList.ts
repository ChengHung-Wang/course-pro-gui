import type { Semester } from "@/models/course/semester";
import type { Credit } from "@/models/course/credit";

export interface CreditList {
    semester: string,
    credit?: Credit,
    columns: Array<{
        prop: string,
        label: string
    }>,
    data: Array<any>
}