export type FilterType = "all" | "alphabetical" | "count";

export interface Option {
    label: string;
    option: FilterType;
}
