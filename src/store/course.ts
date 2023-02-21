import { defineStore } from "pinia";
import type { CourseTarget } from "@/models/courseTarget";
import { toRaw } from "vue";
import { useGlobalStore } from "@/store/global";
import { ElMessage } from "element-plus";
import { request } from "@/api";
import router from "@/router";
import moment from 'moment'
import type { Course } from "@/models/course";

const globalStore = useGlobalStore();

interface TimelineSession {
    id: number;
    name: string;
    start_at: string;
    end_at: string;
    hold_on: string;
}

interface Schedule {
    totalCredit: number;
    courses: Course[];
    timeline: {
        M: TimelineSession[];
        T: TimelineSession[];
        W: TimelineSession[];
        R: TimelineSession[];
        F: TimelineSession[];
        S: TimelineSession[];
        U: TimelineSession[];
    };
}

export const useCourseStore = defineStore("course", {
    state() {
        return {
            appLoading: true,
            schedule: {
                timeline: {},
                courses: [],
                totalCredit: -1,
                colAmount: 14,
                rowAmount: 7,
            },
            history: {
                courses: [],
            },
            targets: Array<CourseTarget>(),
            dayIcons: {
                F: new URL("/src/assets/icons/icons8-friday.svg", import.meta.url),
                M: new URL("/src/assets/icons/icons8-monday.svg", import.meta.url),
                R: new URL("/src/assets/icons/icons8-thursday.svg", import.meta.url),
                S: new URL("/src/assets/icons/icons8-saturday.svg", import.meta.url),
                T: new URL("/src/assets/icons/icons8-tuesday.svg", import.meta.url),
                U: new URL("/src/assets/icons/icons8-sunday.svg", import.meta.url),
                W: new URL("/src/assets/icons/icons8-wednesday.svg", import.meta.url),
            } as Record<string, URL>,
            menu: {
                items: [
                    {
                        displayName: "總覽",
                        icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z"></path></svg>',
                        click: () => {
                            router.push("/course");
                        },
                    },
                    {
                        displayName: "課程規劃",
                        icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M192 128v768h640V128H192zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32z"></path><path fill="currentColor" d="M672 128h64v768h-64zM96 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32zm0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32zm0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32zm0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32z"></path></svg>',
                        click: () => {
                            router.push("/course/plan");
                        },
                    },
                    {
                        displayName: "課程轉讓",
                        icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M384 96a32 32 0 0 1 64 0v786.752a32 32 0 0 1-54.592 22.656L95.936 608a32 32 0 0 1 0-45.312h.128a32 32 0 0 1 45.184 0L384 805.632V96zm192 45.248a32 32 0 0 1 54.592-22.592L928.064 416a32 32 0 0 1 0 45.312h-.128a32 32 0 0 1-45.184 0L640 218.496V928a32 32 0 1 1-64 0V141.248z"></path></svg>',
                        click: () => {
                            router.push("/course/transfer");
                        },
                    },
                    {
                        displayName: "歷史",
                        icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M289.088 296.704h92.992a32 32 0 0 1 0 64H232.96a32 32 0 0 1-32-32V179.712a32 32 0 0 1 64 0v50.56a384 384 0 0 1 643.84 282.88 384 384 0 0 1-383.936 384 384 384 0 0 1-384-384h64a320 320 0 1 0 640 0 320 320 0 0 0-555.712-216.448z"></path></svg>',
                        click: () => {
                            router.push("/course/history");
                        },
                    },
                    {
                        displayName: "期末評量",
                        icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M280.768 753.728 691.456 167.04a32 32 0 1 1 52.416 36.672L314.24 817.472a32 32 0 0 1-45.44 7.296l-230.4-172.8a32 32 0 0 1 38.4-51.2l203.968 152.96zM736 448a32 32 0 1 1 0-64h192a32 32 0 1 1 0 64H736zM608 640a32 32 0 0 1 0-64h319.936a32 32 0 1 1 0 64H608zM480 832a32 32 0 1 1 0-64h447.936a32 32 0 1 1 0 64H480z"></path></svg>',
                        click: () => {
                            ElMessage({message: "開發中"});
                        },
                    },
                    {
                        displayName: "選課設定",
                        icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M764.416 254.72a351.68 351.68 0 0 1 86.336 149.184H960v192.064H850.752a351.68 351.68 0 0 1-86.336 149.312l54.72 94.72-166.272 96-54.592-94.72a352.64 352.64 0 0 1-172.48 0L371.136 936l-166.272-96 54.72-94.72a351.68 351.68 0 0 1-86.336-149.312H64v-192h109.248a351.68 351.68 0 0 1 86.336-149.312L204.8 160l166.208-96h.192l54.656 94.592a352.64 352.64 0 0 1 172.48 0L652.8 64h.128L819.2 160l-54.72 94.72zM704 499.968a192 192 0 1 0-384 0 192 192 0 0 0 384 0z"></path></svg>',
                        click: () => {
                            router.push("/course/setting");
                        },
                    },
                    {
                        displayName: "搶課服務器",
                        icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"></path><path fill="currentColor" d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"></path></svg>',
                        click: () => {
                            router.push("/course/instance");
                        },
                    },
                ],
                active: 0,
            },
            maximumCredits: 0,
            checkTime: Date(),

        };
    },
    getters: {},
    actions: {
        // -----------------------------
        // ------------ API ------------
        // -----------------------------
        async getScheduleSummary() {
            globalStore.checkLogin();
            this.checkTime = moment().format();
            const result = await request("GET", "/course/my/schedule");
            if (result.status != 200) {
                // useLoginStore().logout();
                // TODO Handle the error
            }
            this.schedule.courses = result.res.data.courses;
            this.schedule.timeline = result.res.data.timeline;
            this.schedule.totalCredit = result.res.data.total_credit;
            return result;
        },
        getScheduleTable() {
            const result: any = [];
            const days = Object.keys(this.schedule.timeline);
            const momentMap: Record<string, number> = {
                "10": 10,
                A: 11,
                B: 12,
                C: 13,
                D: 14,
            };
            toRaw(this.schedule).courses.map((e: any) => {
                const hold_on = e.hold_on.sort((a: String, b: String) => {
                    if (days.indexOf(a.charAt(0)) == days.indexOf(b.charAt(0))) {
                        return parseInt(a.substring(1)) - parseInt(b.substring(1));
                    }
                    return days.indexOf(a.charAt(0)) - days.indexOf(b.charAt(0));
                });
                // group
                let cache: any = [];
                hold_on.map((el: any) => {
                    if (parseInt(el.substring(1), 16) > 9) {
                        el = String(el).charAt(0) + momentMap[String(el).substring(1)];
                    }
                    if (cache.length > 0) {
                        const last = cache[cache.length - 1];
                        if (
                            !(
                                days.indexOf(last.charAt(0)) == days.indexOf(el.charAt(0)) &&
                                el.substring(1) - last.substring(1) == 1
                            )
                        ) {
                            result.push({
                                size: cache.length,
                                col: parseInt(cache[0].substring(1)) - 1,
                                row: days.indexOf(cache[0].charAt(0)),
                                courseInfo: e,
                            });
                            cache = [];
                        }
                    }
                    cache.push(el);
                });
                if (cache.length > 0) {
                    result.push({
                        size: cache.length,
                        col: parseInt(cache[0].substring(1)) - 1,
                        row: days.indexOf(cache[0].charAt(0)),
                        courseInfo: e,
                    });
                }
                return e;
            });
            return result;
        },
        async getGPA() {
            return await request("GET", "/course/my/history/avg");
        },
        async searchCourse(semester: string, keyword: string, key: string) {
            let params: any = {};
            params.Semester = semester;
            params[key] = keyword;
            return await request("POST", "/course/search", params);
        },
        async getMaxiumCredits() {
            const gpa = await this.getGPA();
            if (gpa.status != 200) {
                this.maximumCredits = 31;
                return 31;
            }
            const latestGPA = gpa.res.data[gpa.res.data.length - 1].avg;
            latestGPA >= 3.38 ? this.maximumCredits = 31 : this.maximumCredits = 25;
            return this.maximumCredits;
        },
        async getTarget() {
            const result = await request("GET", "/course/my/target");
            if (result.status == 200) {
                this.targets = result.res.data;
            }
            return result;
        },
        async pushTarget(courseID: number) {
            const result = await request("POST", `/course/my/target/${courseID}`);
            if (result.status == 200) {
                this.targets = result.res.data;
            }
            return result;
        },
        async delTarget(courseID: number) {
            const result = await request("DELETE", `/course/my/target/${courseID}`);
            if (result.status == 200) {
                this.targets = result.res.data;
            }
            return result;
        }
    },
});
