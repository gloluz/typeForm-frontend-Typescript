import React from "react";

import { Tab, AnswersOfOnePerson, QuestionTitle, AnswerText } from "./styles";
import Flex from "../../components/Flex";
import QuestionType from "../../components/QuestionType";
import Rating from "../../components/Rating";

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

export interface AnswerProps {
  answers: Answer[][];
}

const Answers = ({ answers }: AnswerProps) => {
  return (
    <Tab>
      <Flex direction="column">
        {answers.map(answersOfOnePerson => (
          <AnswersOfOnePerson>
            {answersOfOnePerson.map((answer, index) => (
              <Flex direction="row">
                <div style={{ minWidth: 120 }}>
                  <QuestionType type={answer.type} index={index + 1} />
                </div>

                <Flex direction="column" justify="flex-start">
                  <QuestionTitle>{answer.question}</QuestionTitle>

                  {answer.type === "text" && (
                    <AnswerText>{answer.text}</AnswerText>
                  )}

                  {answer.type === "note" && (
                    <div style={{ marginTop: 40, marginBottom: 50 }}>
                      <Rating value={answer.rating} />
                    </div>
                  )}
                </Flex>
              </Flex>
            ))}
          </AnswersOfOnePerson>
        ))}
      </Flex>
    </Tab>
  );
};

export default Answers;
