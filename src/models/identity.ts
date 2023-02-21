export type Department = {
    college_id: number,
    id: number,
    name_en: string,
    name_zh: string,
    prefix_no: number,
};

export type College = {
    id: number,
    name_en: string,
    name_zh: string,
    no: number,
};

export type Question = {
    id: number,
    description: string,
    reply: string,
}

