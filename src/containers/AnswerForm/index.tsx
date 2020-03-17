import React, { useState, useEffect } from "react";

import Container from "../../components/Container";
import Flex from "../../components/Flex";
import { Link } from "react-router-dom";
import Icon from "../../components/Icon";
import { StyledText } from "../CreateForm/styles";
import { BlueBox } from "../../components/BlueBox";
import Title from "../../components/Title";
import Button from "../../components/Button";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { Question } from "../../types/Question";
import Rating from "../../components/Rating";

const TextArea = styled.textarea`
  background-color: ${COLORS.white};
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 35px 25px;
  margin-top: 40px;
  margin-bottom: 40px;
  color: ${COLORS.darkBlue};
  font-size: 18px;
  font-weight: 400;
  font-family: "Averta", sans-serif;
  max-width: 100%;
  width: 1040px;
  min-height: 215px;
  box-sizing: border-box;

  &:focus {
    box-shadow: 0 0 0 1px ${COLORS.blue};
  }
`;

export type QuestionScreen = "home" | "question" | "success";

const AnswerForm = () => {
  const [questionScreen, setQuestionScreen] = useState<QuestionScreen>("home");
  const [questions, setQuestions] = useState<Question[]>([]);
  // const [answers, setAnswers] = useState
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  const beginQuestion = () => {
    setQuestionScreen("question");
  };

  const previousScreen = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setQuestionScreen("home");
    }
  };

  const nextScreen = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuestionScreen("success");
    }
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
      </Flex>

      <BlueBox>
        {questionScreen === "home" && (
          <Flex direction="column" justify="center" flex="1">
            <Title level={4}>Sondage</Title>
            <Title level={1} style={{ marginTop: 20, marginBottom: 20 }}>
              Votre avis sur...
            </Title>
            <Title level={2}>{questions.length} questions</Title>
            <Button
              appearance="fill"
              color="blue"
              style={{ marginTop: 15 }}
              onClick={beginQuestion}
            >
              Commencer
            </Button>
          </Flex>
        )}

        {questionScreen === "question" && (
          <Flex direction="column" justify="center" align="center" flex="1">
            <Flex flex="1" direction="column" justify="center" align="center">
              <Title level={4} style={{ marginBottom: 15 }}>
                Question {currentQuestion + 1}
              </Title>
              <Title level={1}>{questions[currentQuestion].title}</Title>

              {questions[currentQuestion].type === "text" && (
                <TextArea placeholder="Répondez ici..." />
              )}

              {questions[currentQuestion].type === "note" && (
                <Flex align="center" justify="center" style={{ height: 215 }}>
                  <Rating />
                </Flex>
              )}
            </Flex>

            <Flex
              direction="row"
              justify="space-between"
              style={{ width: "100%" }}
            >
              <Button
                appearance="text"
                color="blue"
                iconBefore="arrow-left"
                onClick={previousScreen}
              >
                Précédent
              </Button>

              <Button
                appearance="fill"
                color="blue"
                iconAfter="arrow-right"
                onClick={nextScreen}
              >
                Suivant
              </Button>
            </Flex>
          </Flex>
        )}

        {questionScreen === "success" && (
          <Flex flex="1" direction="column" justify="center" align="center">
            <Title level={1}>Merci d'avoir répondu à ce formulaire</Title>

            <Link to="/" style={{ textDecoration: "none" }}>
              <Button appearance="fill" color="blue" style={{ marginTop: 60 }}>
                Accéder à mes formulaires
              </Button>
            </Link>
          </Flex>
        )}
      </BlueBox>
    </Container>
  );
};

export default AnswerForm;
