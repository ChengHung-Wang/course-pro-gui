import { defineStore } from "pinia";
import { request } from "@/api";
import type { SystemMapScoreApi } from "@/models/api/system/map/score";
import type { CourseMyHistoryApi } from "@/models/api/course/my/history";
import type { GpaNames } from "@/models/api";

interface Credit {
  failedCredit: number;
  lowerAverageCredit: number;
  safeCredit: number;
  secondDropCredit: number;
  lostScoreTotal: number;
  GPAAverage: number; // totalGPAScore / totalCountableCredit
  totalGPAScore: number; // sum of (rating * credit)
  totalCountableCredit: number; // sum of credit
}

interface CreditList {
  semester: string;
  credit?: Credit;
  columns: Array<{
    prop: string;
    label: string;
  }>;
  data: Array<any>;
}

interface State {
  courseHistory: CourseMyHistoryApi["data"] | null;
  semesterList: any[]; // TODO CourseMyHistoryApi.data does not contain original
  creditLists: CreditList[];
  tableData: CreditList[] | null;
  isLoading: boolean;
  gpaMap: SystemMapScoreApi["map_gpa"] | null;
}

export const useHistoryStore = defineStore("history", {
  state: (): State => ({
    // History Information
    courseHistory: null, // All the semester history
    semesterList: [], // list of semester
    tableData: [], // All history for fronted-end Table
    creditLists: [], // list all credit categories by semester
    isLoading: true,
    gpaMap: null,
  }),
  getters: {},
  actions: {
    // API
    async getCourseHistory() {
      const scoreMapRequest = await request<SystemMapScoreApi>(
        "GET",
        `/system/map/score`
      );
      this.gpaMap = scoreMapRequest.res.data.map_gpa;

      const historyRequest = await request<CourseMyHistoryApi>(
        "GET",
        `/course/my/history`
      );
      const history = (historyRequest.res as CourseMyHistoryApi).data;
      this.courseHistory = history;

      // TODO ???
      history.forEach((entry) => {
        if (
          !this.semesterList.find(
            (e) =>
              e === entry.original.semester || this.semesterList.length === 0
          )
        ) {
          this.semesterList.push(entry.original.semester);
        }
      });

      this.semesterList.forEach((semester) => {
        const courseData: {
          name: any;
          rating: any;
          teacher: string;
          serial: any;
          dimension: any;
          notes: any;
          ratingNumber: number;
          credit: number;
          countable: boolean; // is countable for GPA score
          secondDrop: boolean;
        }[] = [];

        history.forEach((element) => {
          if (element.original.semester === semester) {
            // course is an element of courseData
            const course: (typeof courseData)[number] = {
              name: element.original.name,
              rating: element.original.rating,
              teacher: element.course.teacher?.name_zh ?? "Not Found",
              serial: element.original.serial,
              dimension: element.original.dimension ?? "-",
              notes: element.original.notes,
              ratingNumber: -1,
              credit: element.course.points ?? 0,
              countable: true, // is countable for GPA score
              secondDrop: false, // is second drop course
            };

            const rating: GpaNames | "通過" = element.original.rating;
            if (rating === "通過") {
              course.countable = false;
              course.ratingNumber = -1;
            } else {
              course.ratingNumber = this.gpaMap![rating];
            }

            if (course.notes === "抵免" || course.notes === "免修") {
              course.countable = false;
            } else if (course.notes === "二次退選") {
              course.countable = false;
              course.secondDrop = true;
            }

            courseData.push(course);
          }
        });

        const table: CreditList = {
          semester: semester,
          columns: [
            { prop: "name", label: "課程名稱" },
            { prop: "credit", label: "學分" },
            { prop: "teacher", label: "老師" },
            { prop: "serial", label: "課程代碼" },
            { prop: "dimension", label: "向度" },
            { prop: "notes", label: "備註說明" },
            { prop: "rating", label: "成績" },
          ],
          data: courseData,
        };
        this.tableData.push(table);
      });
    },

    async getSemesterCreditInformation() {
      if (!this.courseHistory) {
        await this.getCourseHistory();
      }

      for (let index = 0; index < this.semesterList.length; index++) {
        const creditList = {
          semester: this.semesterList[index],
          credit: {
            failedCredit: 0,
            lowerAverageCredit: 0,
            safeCredit: 0,
            secondDropCredit: 0,
            lostScoreTotal: 0,
            GPAAverage: 0, // totalGPAScore / totalCountableCredit
            totalGPAScore: 0, // sum of (rating * credit)
            totalCountableCredit: 0, // sum of credit
          },
        };
        this.tableData[index].data.forEach((element) => {
          if (element.countable === true) {
            creditList.credit.totalGPAScore +=
              element.ratingNumber * Number(element.credit);
            creditList.credit.totalCountableCredit += Number(element.credit);
            if (element.ratingNumber === 4.3) {
              creditList.credit.safeCredit += Number(element.credit);
            } else if (
              element.ratingNumber < 4.3 &&
              element.ratingNumber > 1.0
            ) {
              creditList.credit.lowerAverageCredit += Number(element.credit);
            } else if (element.ratingNumber <= 1.0) {
              creditList.credit.failedCredit += Number(element.credit);
            }
            creditList.credit.lostScoreTotal +=
              (element.ratingNumber - 4.3) * Number(element.credit);
            console.log(
              (element.ratingNumber - 4.3) * Number(element.credit),
              element
            );
          } else if (element.secondDrop === true) {
            creditList.credit.secondDropCredit += Number(element.credit);
          }
        });
        creditList.credit.GPAAverage =
          creditList.credit.totalGPAScore /
          creditList.credit.totalCountableCredit;
        this.creditLists.push(creditList);
      }
      return this.creditLists;
    },
  },
});
