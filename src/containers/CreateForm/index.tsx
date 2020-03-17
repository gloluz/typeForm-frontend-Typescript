import React, { useState, useEffect, ChangeEvent } from "react";

import Container from "../../components/Container";
import Button from "../../components/Button";
import Flex from "../../components/Flex";
import { Link } from "react-router-dom";
import Icon from "../../components/Icon";
import { BlueBox } from "../../components/BlueBox";
import { StyledText, Input, TabItem } from "./styles";
import Answers from "./Answers";
import Questions from "./Questions";
import { Question, QuestionTypeTitle } from "../../types/Question";
import { Answer } from "../../types/Answer";

export type TabItem = "questions" | "answers";

const CreateForm = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem>("questions");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[][]>([]);
  const [titleForm, setTitleForm] = useState<string>("");

  console.log("title>>>", titleForm);

  const moveUpQuestion = (index: number) => {
    const newQuestions = [...questions];

    if (index > 0) {
      let indexToUp = newQuestions[index - 1];
      newQuestions[index - 1] = newQuestions[index];
      newQuestions[index] = indexToUp;
    }

    setQuestions(newQuestions);
  };

  const moveDownQuestion = (index: number) => {
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

  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setTitleForm(value);
  };

  const onAdd = (type: QuestionTypeTitle) => {
    setQuestions([...questions, { title: "", type }]);
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
          <Input
            type="text"
            name="title"
            style={{ marginRight: 10 }}
            placeholder="Nom du formulaire"
            onChange={handleChangeText}
            value={titleForm}
          />
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

          <Link to="/form/answer" style={{ textDecoration: "none" }}>
            <Button
              appearance="fill"
              color="blue"
              disabled={titleForm.trim() === ""}
            >
              Répondre
            </Button>
          </Link>
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
          <Questions
            questions={questions}
            onChangeText={onChangeText}
            moveUpQuestion={moveUpQuestion}
            moveDownQuestion={moveDownQuestion}
            removeQuestion={removeQuestion}
            onAdd={onAdd}
            disabled={titleForm.trim() === ""}
          />
        )}

        {selectedTab === "answers" && <Answers answers={answers} />}
      </BlueBox>
    </Container>
  );
};

export default CreateForm;
