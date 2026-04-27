export type Course = {
    term: "Fall" | "Winter" | "Spring" | "Summer";
    number: string;
    meets: string;
    title: string;
    conflicts: string[];
}