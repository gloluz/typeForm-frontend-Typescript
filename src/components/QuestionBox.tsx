import React from "react";
import styled from "styled-components";

import Box from "./Box";
import Button from "./Button";
import Title from "./Title";
import { COLORS } from "../constants";
import Flex from "./Flex";

const Heading = styled.h2`
  text-transform: uppercase;
  color: ${COLORS.black};
  font-size: 12px;
`;

export interface QuestionBoxProps {
  question: string;
}

const QuestionBox = ({ question }: QuestionBoxProps) => {
  return (
    <Box color="silver">
      <Heading>Formulaire</Heading>
      <Flex align="center" style={{ height: 130, overflow: "hidden" }}>
        <Title level={2}>{question}</Title>
      </Flex>
      <Flex justify="flex-end">
        <Button
          appearance="text"
          color="blue"
          size="small"
          style={{ marginRight: 10 }}
        >
          Editer
        </Button>
        <Button appearance="fill" color="blue" size="small">
          Répondre
        </Button>
      </Flex>
    </Box>
  );
};

export default QuestionBox;
