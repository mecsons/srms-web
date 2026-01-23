import type {IAssessmentResults} from "@/modules/result/lib/types.ts";

export function formatScore(score: number | null) {
    return (score == null) ? "—" : score;
}

export function getSubjectColumns(results: IAssessmentResults) {
    return results.columns.filter((c) => c.subjectId);
}

export function getAverageColumn(results: IAssessmentResults) {
    return results.columns.find((c) => c.key === "average");
}