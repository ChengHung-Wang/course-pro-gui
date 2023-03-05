import { defineStore } from "pinia";
import { useGlobalStore } from "@/store/global";
import { request } from "@/api";
import { useRouter } from "vue-router";
import type { CreditList } from "@/models/course/creditList";
import type { HistoryTable } from "@/models/course/historyTable";

const router = useRouter();
const globalStore = useGlobalStore();

export const useHistoryStore = defineStore("history", {
    state() {
        // History Information
        return {
            courseHistory: [], // All the semester history
            semesterList: [], // list of semester
            tableData: Array<HistoryTable>(), // All history for fronted-end Table
            creditLists: Array<CreditList>(), // list all credit categories by semester
            isLoading: true,
            map_gpa: {},
        }
    },
    getters: {},
    actions: {
        // API
        async getCourseHistory() {
            const data = await request("GET", `/course/my/history`);
            const GPAtransformAPI = await request("GET", `/system/map/score`);
            this.map_gpa = GPAtransformAPI.res.data.map_gpa;
            const result:any = data.res.data; // result = [{ course 1 , course 2, ...}];
            this.courseHistory = result;
            result.forEach(element => {
                if (!this.semesterList.find(e => e === element.original.semester || this.semesterList.length === 0)) {
                    this.semesterList.push(element.original.semester);
                }
            });

            this.semesterList.forEach(currSemester => {
                let courseData:Array<any> = [];
                result.forEach(element => {
                    if (element.original.semester === currSemester) {
                        let course = {
                            name: "",
                            rating: "",
                            teacher: "",
                            serial: "",
                            dimension: "",
                            notes: "",
                            ratingNumber: -1,
                            credit: 0,
                            countable: true, // is countable for GPA score
                            secondDrop: false, // is second drop course
                        }
                        course.name = element.original.name;
                        course.rating = element.original.rating;
                        course.credit = 0;
                        if (element.course) {
                            course.teacher = element.course.teacher.name_zh;
                            if (element.course.points !== null) {
                                course.credit = Number(element.course.points);
                            }
                        } else {
                            course.teacher = "Not Found";
                        }
                        course.serial = element.original.serial;
                        if (element.original.dimension === null) {
                            course.dimension = "-";
                        } else {
                            course.dimension = element.original.dimension;
                        }
                        const rating = element.original.rating;
                        if (rating === "通過") {
                            course.countable = false;
                            course.ratingNumber = -1;
                        } else {
                            course.ratingNumber = this.map_gpa[rating];
                        }

                        const note = element.original.notes;
                        if (note === "抵免" || note === "免修") {
                            course.countable = false;
                        } else if (note === "二次退選") {
                            course.countable = false;
                            course.secondDrop = true;
                        }
                        course.notes = note;
                        courseData.push(course);
                    }
                });
                let table: CreditList = {
                    semester: currSemester,
                    columns: [
                        {prop: 'name', label: '課程名稱'},
                        {prop: 'credit', label: '學分'},
                        {prop: 'teacher', label: '老師'},
                        {prop: 'serial', label: '課程代碼'},
                        {prop: 'dimension', label: '向度'},
                        {prop: 'notes', label: '備註說明'},
                        {prop: 'rating', label: '成績'}
                    ],
                    data: courseData
                };
                this.tableData.push(table);
            });
            return result;
        },
        async getSemesterCreditInformation() {
            await this.getCourseHistory();
            for (let index = 0; index < this.semesterList.length; index++) {
                let creditList = {
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
                }
                this.tableData[index].data.forEach(element => {
                    if (element.countable === true) {
                        creditList.credit.totalGPAScore += element.ratingNumber * Number(element.credit);
                        creditList.credit.totalCountableCredit += Number(element.credit);
                        if (element.ratingNumber === 4.3) {
                            creditList.credit.safeCredit += Number(element.credit);
                        } else if (element.ratingNumber < 4.3 && element.ratingNumber > 1.0) {
                            creditList.credit.lowerAverageCredit += Number(element.credit);
                        } else if (element.ratingNumber <= 1.0) {
                            creditList.credit.failedCredit += Number(element.credit);
                        }
                        creditList.credit.lostScoreTotal += (element.ratingNumber - 4.3) * Number(element.credit);
                        console.log( (element.ratingNumber - 4.3) * Number(element.credit), element)
                    } else if (element.secondDrop === true) {
                        creditList.credit.secondDropCredit += Number(element.credit);
                    }
                });
                creditList.credit.GPAAverage = creditList.credit.totalGPAScore / creditList.credit.totalCountableCredit;
                this.creditLists.push(creditList);
            }
            return this.creditLists;
        }

    },
});