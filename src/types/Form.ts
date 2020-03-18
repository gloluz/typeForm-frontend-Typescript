import { Question } from "./Question";
import { Answer } from "./Answer";

export interface Form {
  _id?: string;
  title: string;
  questions: Question[];
  answers: Answer[][];
}
