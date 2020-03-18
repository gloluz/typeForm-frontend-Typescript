import React, { useState, useEffect, ChangeEvent } from "react";

import Container from "../../components/Container";
import Button from "../../components/Button";
import Flex from "../../components/Flex";
import { Link, useParams, useHistory } from "react-router-dom";
import Icon from "../../components/Icon";
import { BlueBox } from "../../components/BlueBox";
import { StyledText, Input, TabItem } from "./styles";
import Answers from "./Answers";
import Questions from "./Questions";
import { Question, QuestionTypeTitle } from "../../types/Question";
import { Answer } from "../../types/Answer";
import { postForm } from "../../services/postForm";
import { fetchForm } from "../../services/fetchForm";
import { updateForm } from "../../services/updateForm";
import { deleteForm } from "../../services/deleteForm";

export type TabItem = "questions" | "answers";

const Form = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem>("questions");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[][]>([]);
  const [titleForm, setTitleForm] = useState<string>("");

  const { id } = useParams();
  const history = useHistory();

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

  const handleForm = () => {
    if (!id) {
      postForm({ title: titleForm, questions, answers });
      history.push("/");
    } else {
      updateForm({ title: titleForm, questions, answers, _id: id });
      history.push("/");
    }
  };

  const getForm = async () => {
    const form = await fetchForm(id as string);

    if (!form) {
      history.push("/");
    } else {
      setTitleForm(form.title);
      setQuestions(form.questions || []);
      setAnswers(form.answers || []);
    }
  };

  const deletedForm = async () => {
    const isSuccess = await deleteForm(id as string);

    if (isSuccess) {
      history.push("/");
    } else {
      alert("Une erreur inconnue est survenue");
    }
  };

  useEffect(() => {
    if (id === undefined) {
      setQuestions([]);
      setAnswers([]);
    } else {
      getForm();
    }
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
            onClick={handleForm}
          />
        </Flex>

        <Flex direction="row">
          <Button
            appearance="outline"
            color="pink"
            iconCenter="trash"
            style={{ marginRight: 10 }}
            onClick={deletedForm}
          />

          <Link to={`/form/${id}/answer`} style={{ textDecoration: "none" }}>
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
            onSave={handleForm}
          />
        )}

        {selectedTab === "answers" && <Answers answers={answers} />}
      </BlueBox>
    </Container>
  );
};

export default Form;
