import React, { useState, useEffect, ChangeEvent } from "react";
import styled, { css } from "styled-components";

import { COLORS } from "../constants";
import Container from "../components/Container";
import Button from "../components/Button";
import Flex from "../components/Flex";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import QuestionType, { QuestionTypeTitle } from "../components/QuestionType";
import { BlueBox } from "../components/BlueBox";
import Rating from "../components/Rating";

const Input = styled.input`
  outline: none;
  height: 50px;
  font-size: 24px;
  font-family: "Averta", sans-serif;
  width: 435px;
  color: ${COLORS.black};
  border: 1px solid ${COLORS.silver};
  border-radius: 5px;
  box-sizing: border-box;

  &:focus {
    box-shadow: 0 0 0 1px ${COLORS.black};
  }
`;

const StyledText = styled.span`
  color: ${COLORS.black};
  font-family: "Averta", sans-serif;
  font-weight: bold;
  font-size: 18px;
  margin-left: 15px;
`;

interface TabItemProps {
  isSelected: boolean;
}

const TabItem = styled.button<TabItemProps>`
  cursor: pointer;
  outline: none;
  border: none;
  border-bottom: 3px solid transparent;
  background: transparent;
  font-size: 24px;
  font-weight: bold;
  font-family: "Averta", sans-serif;
  color: ${COLORS.blue};
  padding: 0;
  margin-right: 80px;
  transition: 0.2s all ease;

  &:hover {
    color: ${COLORS.darkBlue};
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      color: ${COLORS.darkBlue};
      border-bottom-color: ${COLORS.darkBlue};
    `}
`;

const Tab = styled.div`
  margin-top: 66px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const QuestionTitleInput = styled.input`
  outline: none;
  border: none;
  padding: 0 10px;
  height: 40px;
  flex: 1;
  background-color: ${COLORS.white};
  font-size: 16px;
  font-family: "Helvetica Neue", sans-serif;
  color: ${COLORS.black};
  border-radius: 5px;
  box-sizing: border-box;
  margin-left: 30px;
  transition: 0.2s all ease;

  &:focus {
    box-shadow: 0 0 0 1px ${COLORS.blue};
  }
`;

const QuestionTitle = styled.span`
  color: ${COLORS.blue};
  font-size: 22px;
  font-family: "Helvetica Neue", sans-serif;
  margin-top: 5px;
`;

const AnswerText = styled.span`
  font-size: 16px;
  font-family: "Helvetica Neue", sans-serif;
  color: ${COLORS.black};
  margin: 40px 0;
`;

const Answers = styled.div`
  border-bottom: 1px solid ${COLORS.blue};
  flex: 1;
  min-width: 100%;
  margin-bottom: 40px;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

export interface Question {
  type: QuestionTypeTitle;
  title: string;
}

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

export type TabItem = "questions" | "answers";

const CreateForm = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem>("questions");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[][]>([]);

  const questionToUp = (index: number) => {
    const newQuestions = [...questions];

    if (index > 0) {
      let indexToUp = newQuestions[index - 1];
      newQuestions[index - 1] = newQuestions[index];
      newQuestions[index] = indexToUp;
    }

    setQuestions(newQuestions);
  };

  const questionToDown = (index: number) => {
    const newQuestions = [...questions];

    if (newQuestions.length - 1 > index) {
      let indexToDow = newQuestions[index + 1];
      newQuestions[index + 1] = newQuestions[index];
      newQuestions[index] = indexToDow;
    }

    setQuestions(newQuestions);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);

    setQuestions(newQuestions);
  };

  const onChangeText = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value;
    const newQuestions = [...questions];
    newQuestions[index].title = value;

    setQuestions(newQuestions);
  };

  useEffect(() => {
    setQuestions([
      {
        title: "Qu'avez vous pensé de l'accueil ?",
        type: "text"
      },
      {
        title: "Quelle note attribueriez-vous au buffet ?",
        type: "note"
      }
    ]);

    setAnswers([
      [
        {
          type: "text",
          question: "Qu'avez vous pensé de l'accueil ?",
          text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate facilis voluptas quibusdam earum odio quod modi libero! Dignissimos aperiam adipisci, reiciendis illum qui quo eligendi ullam sed, quibusdam velit doloremque!"
        },
        {
          type: "note",
          question: "Quelle note attribueriez-vous au buffet ?",
          rating: 4
        }
      ],
      [
        {
          type: "text",
          question: "Qu'avez vous pensé de l'accueil ?",
          text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate facilis voluptas quibusdam earum odio quod modi libero! Dignissimos aperiam adipisci, reiciendis illum qui quo eligendi ullam sed, quibusdam velit doloremque!"
        },
        {
          type: "note",
          question: "Quelle note attribueriez-vous au buffet ?",
          rating: 4
        }
      ]
    ]);
  }, []);

  return (
    <Container>
      <Flex direction="row" justify="space-between" align="center">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Flex direction="row" align="center">
            <Icon icon="chevron-left" color="black" size="24px" />
            <StyledText>Mes formulaires</StyledText>
          </Flex>
        </Link>

        <Flex direction="row">
          <Input type="text" name="title" style={{ marginRight: 10 }} />
          <Button
            appearance="outline"
            color="blue"
            iconCenter="check"
            iconSize="22px"
          />
        </Flex>

        <Flex direction="row">
          <Button
            appearance="outline"
            color="pink"
            iconCenter="trash"
            style={{ marginRight: 10 }}
          />
          <Button appearance="fill" color="blue">
            Répondre
          </Button>
        </Flex>
      </Flex>

      <BlueBox>
        <Flex>
          <TabItem
            isSelected={selectedTab === "questions"}
            onClick={() => setSelectedTab("questions")}
          >
            Questions
          </TabItem>
          <TabItem
            isSelected={selectedTab === "answers"}
            onClick={() => setSelectedTab("answers")}
          >
            Réponses
          </TabItem>
        </Flex>

        {selectedTab === "questions" && (
          <Tab>
            <Flex direction="column" flex={"1"}>
              <Flex direction="column" style={{ minWidth: "100%" }}>
                {questions.map((question, index) => (
                  <Flex
                    align="center"
                    style={{ marginBottom: 50, minWidth: "100%" }}
                    key={index}
                  >
                    <QuestionType type={question.type} index={index + 1} />
                    <QuestionTitleInput
                      value={question.title}
                      name="questionTitle"
                      onChange={event => onChangeText(event, index)}
                    />

                    <Button
                      appearance="bgWhite"
                      color="black"
                      iconCenter="chevron-up"
                      size="small"
                      iconSize="28px"
                      style={{ marginLeft: 10 }}
                      disabled={index === 0}
                      onClick={() => questionToUp(index)}
                    />
                    <Button
                      appearance="bgWhite"
                      color="black"
                      iconCenter="chevron-down"
                      size="small"
                      iconSize="28px"
                      disabled={index === questions.length - 1}
                      style={{ marginLeft: 10 }}
                      onClick={() => questionToDown(index)}
                    />
                    <Button
                      appearance="bgWhite"
                      color="pink"
                      iconCenter="trash"
                      size="small"
                      style={{ marginLeft: 10 }}
                      onClick={() => removeQuestion(index)}
                    />
                  </Flex>
                ))}
              </Flex>
              <Flex>
                <Button
                  appearance="outline"
                  iconBefore="file-text"
                  color="blue"
                  style={{ marginRight: 15 }}
                  onClick={() => {
                    setQuestions([...questions, { title: "", type: "text" }]);
                  }}
                >
                  Ajouter une question "Texte"
                </Button>
                <Button
                  appearance="outline"
                  iconBefore="star"
                  color="blue"
                  onClick={() => {
                    setQuestions([...questions, { title: "", type: "note" }]);
                  }}
                >
                  Ajouter une question "Note"
                </Button>
              </Flex>
            </Flex>

            <Flex
              justify="flex-end"
              style={{ justifySelf: "flex-end", marginTop: 24 }}
            >
              <Button appearance="fill" color="blue">
                Sauvegarder
              </Button>
            </Flex>
          </Tab>
        )}

        {selectedTab === "answers" && (
          <Tab>
            <Flex direction="column">
              {answers.map(answersOfOnePerson => (
                <Answers>
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
                </Answers>
              ))}
            </Flex>
          </Tab>
        )}
      </BlueBox>
    </Container>
  );
};

export default CreateForm;
