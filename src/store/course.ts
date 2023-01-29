import {defineStore} from "pinia";
import {ref, toRaw} from "vue";
import {useGlobalStore} from "@/store/global";
import router from "@/router";

const globalStore = useGlobalStore();

export const useCourseStore = defineStore('course', {
    state() {
        return {
            appLoading: ref(true),
            schedule: ref({
                timeline: {},
                courses: []
            }),
            dayIcons: {
                F: require("/src/assets/icons/icons8-friday.svg"),
                M: require("/src/assets/icons/icons8-monday.svg"),
                R: require("/src/assets/icons/icons8-thursday.svg"),
                S: require("/src/assets/icons/icons8-saturday.svg"),
                T: require("/src/assets/icons/icons8-tuesday.svg"),
                U: require("/src/assets/icons/icons8-sunday.svg"),
                W: require("/src/assets/icons/icons8-wednesday.svg"),
            }
        }
    },
    getters: {

    },
    actions: {
        // -----------------------------
        // ------------ API ------------
        // -----------------------------
        async get_schedule_summary()
        {
            globalStore.checkLogin();
            return new Promise(async resolve => {
                const result = await globalStore.send("/api/v2/course/my/schedule", "GET", {}, true);
                this.schedule.courses = await result.res.data.courses;
                this.schedule.timeline = await result.res.data.timeline;
                resolve(result);
            })
        },
        get_schedule_table() {
            let result:any = [];
            const days = Object.keys(this.schedule.timeline);
            const momentMap:any = {
                10: 10,
                A: 11,
                B: 12,
                C: 13,
                D: 14
            }
            toRaw(this.schedule).courses.map((e: any) => {
                let hold_on = e.hold_on.sort((a: String, b: String) => {
                    if (days.indexOf(a.charAt(0)) == days.indexOf(b.charAt(0))) {
                        return parseInt(a.substring(1)) - parseInt(b.substring(1))
                    }
                    return days.indexOf(a.charAt(0)) - days.indexOf(b.charAt(0));
                });
                // group
                let cache:any = [];
                hold_on.map((el: any) => {
                    if (parseInt(el.substring(1), 16) > 9) {
                        el = String(el).charAt(0) + momentMap[String(el).substring(1)];
                    }
                    if (cache.length > 0) {
                        let last = cache[cache.length - 1];
                        if (!(days.indexOf(last.charAt(0)) == days.indexOf(el.charAt(0)) && el.substring(1) - last.substring(1) == 1)) {
                            result.push({
                                size: cache.length,
                                col: parseInt(cache[0].substring(1)) - 1,
                                row: days.indexOf(cache[0].charAt(0)),
                                courseInfo: e
                            });
                            cache = [];
                        }
                    }
                    cache.push(el);
                })
                if (cache.length > 0) {
                    result.push({
                        size: cache.length,
                        col: parseInt(cache[0].substring(1)) - 1,
                        row: days.indexOf(cache[0].charAt(0)),
                        courseInfo: e
                    });
                }
                return e;
            });
            return result;
        }
    }
});