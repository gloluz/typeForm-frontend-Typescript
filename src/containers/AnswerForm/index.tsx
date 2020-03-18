import React, { useState, useEffect } from "react";

import Container from "../../components/Container";
import Flex from "../../components/Flex";
import { Link, useParams } from "react-router-dom";
import Icon from "../../components/Icon";
import { StyledText } from "../Form/styles";
import { BlueBox } from "../../components/BlueBox";
import Title from "../../components/Title";
import Button from "../../components/Button";
import styled from "styled-components";
import { COLORS } from "../../constants";
import Rating from "../../components/Rating";
import { Answer, AnswerNote, AnswerText } from "../../types/Answer";
import { Rating as RatingType } from "../../types/Rating";
import { fetchForm } from "../../services/fetchForm";
import { Form } from "../../types/Form";
import { updateForm } from "../../services/updateForm";

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

const INITIAL_FORM: Form = { title: "", answers: [], questions: [] };

const AnswerForm = () => {
  const [form, setForm] = useState<Form>(INITIAL_FORM);
  const [questionScreen, setQuestionScreen] = useState<QuestionScreen>("home");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  const { id } = useParams();

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

  const addTextAnswer = (text: string, index: number) => {
    const newAnswers = [...answers];

    newAnswers[index] = {
      type: "text",
      text,
      question: form.questions[index].title
    };

    setAnswers(newAnswers);
  };

  const addRatingAnswer = (rating: RatingType, index: number) => {
    const newAnswers = [...answers];

    newAnswers[index] = {
      type: "note",
      rating,
      question: form.questions[index].title
    };

    setAnswers(newAnswers);
  };

  const isValidAnswer = () => {
    const answer = answers[currentQuestion];

    if (!answer) {
      return false;
    }

    if (answer.type === "text") {
      if (answer.text.trim() === "") {
        return false;
      }
    }

    return true;
  };

  const getForm = async () => {
    const form = await fetchForm(id as string);

    if (form) {
      setForm(form);
    }
  };

  const saveAnswers = async () => {
    const newForm = {
      ...form,
      answers: [...form.answers, answers]
    };

    return await updateForm(newForm);
  };

  const nextScreen = () => {
    if (currentQuestion < form.questions?.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuestionScreen("success");
      saveAnswers();
    }
  };

  useEffect(() => {
    getForm();
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
              {form?.title}
            </Title>
            <Title level={2}>{form.questions.length} questions</Title>
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
              <Title level={1}>{form.questions[currentQuestion].title}</Title>

              {form.questions[currentQuestion].type === "text" && (
                <TextArea
                  placeholder="Répondez ici..."
                  onChange={e => addTextAnswer(e.target.value, currentQuestion)}
                  value={
                    answers[currentQuestion]
                      ? (answers[currentQuestion] as AnswerText).text
                      : ""
                  }
                />
              )}

              {form.questions[currentQuestion].type === "note" && (
                <Flex align="center" justify="center" style={{ height: 215 }}>
                  <Rating
                    onChange={rating =>
                      addRatingAnswer(rating, currentQuestion)
                    }
                    value={
                      answers[currentQuestion]
                        ? (answers[currentQuestion] as AnswerNote).rating
                        : undefined
                    }
                  />
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
                disabled={!isValidAnswer()}
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
