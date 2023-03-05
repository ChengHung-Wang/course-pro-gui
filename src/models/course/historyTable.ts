export interface HistoryTable {
  semester: string;
  columns: Array<{
    prop: string;
    label: string;
  }>;
  data: Array<any>;
}
