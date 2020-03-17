import { Rating } from "./Rating";

export interface AnswerNote {
  type: "note";
  question: string;
  rating: Rating;
}

export interface AnswerText {
  type: "text";
  question: string;
  text: string;
}

export type Answer = AnswerText | AnswerNote;
