export type QuestionTypeTitle = "text" | "note";

export interface Question {
  type: QuestionTypeTitle;
  title: string;
}
