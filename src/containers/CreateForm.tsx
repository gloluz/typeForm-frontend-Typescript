import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import { COLORS } from "../constants";
import Container from "../components/Container";
import Button from "../components/Button";
import Flex from "../components/Flex";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import QuestionType, { QuestionTypeTitle } from "../components/QuestionType";

const StyledInput = styled.input`
  height: 50px;
  min-width: 435px;
  color: ${COLORS.black};
  border: 1px solid ${COLORS.silver};
  border-radius: 5px;
  box-sizing: border-box;
`;

const StyledText = styled.span`
  color: ${COLORS.black};
  font-family: "Averta", sans-serif;
  font-weight: bold;
  font-size: 18px;
  margin-left: 15px;
`;

const StyledContent = styled.div`
  background-color: ${COLORS.skyBlue};
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  margin-top: 24px;
  padding: 40px;
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
`;

const QuestionTitleInput = styled.input`
  border: none;
  padding: 0 10px;
  height: 40px;
  flex: 1;
  background-color: ${COLORS.white};
  font-size: 16px;
  color: ${COLORS.black};
  border-radius: 5px;
  box-sizing: border-box;
  margin-left: 30px;
`;

export interface Question {
  type: QuestionTypeTitle;
  title: string;
}

export type TabItem = "questions" | "answers";

const CreateForm = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem>("questions");
  const [questions, setQuestions] = useState<Question[]>([]);

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

        <Flex direction="row">
          <StyledInput type="text" name="title" style={{ marginRight: 10 }} />
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

      <StyledContent>
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
            {questions.map((question, index) => (
              <Flex align="center" style={{ marginBottom: 50 }} key={index}>
                <QuestionType type={question.type} />
                <QuestionTitleInput
                  value={question.title}
                  name="questionTitle"
                />

                <Button
                  appearance="bgWhite"
                  color="black"
                  iconCenter="chevron-up"
                  size="small"
                  iconSize="28px"
                  style={{ marginLeft: 10 }}
                />
                <Button
                  appearance="bgWhite"
                  color="black"
                  iconCenter="chevron-down"
                  size="small"
                  iconSize="28px"
                  style={{ marginLeft: 10 }}
                />
                <Button
                  appearance="bgWhite"
                  color="pink"
                  iconCenter="trash"
                  size="small"
                  style={{ marginLeft: 10 }}
                />
              </Flex>
            ))}
            <Flex>
              <Button
                appearance="outline"
                iconBefore="file-text"
                color="blue"
                style={{ marginRight: 15 }}
              >
                Ajouter une question "Texte"
              </Button>
              <Button appearance="outline" iconBefore="star" color="blue">
                Ajouter une question "Note"
              </Button>
            </Flex>
          </Tab>
        )}

        {selectedTab === "answers" && (
          <Tab>
            <span>answers</span>
          </Tab>
        )}
      </StyledContent>
    </Container>
  );
};

export default CreateForm;
