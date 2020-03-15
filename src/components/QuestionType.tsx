import React from "react";

import Icon from "../components/Icon";
import styled, { css } from "styled-components";
import { COLORS } from "../constants";

export interface QuestionTypeProps {
  type: "text" | "note";
}

const Minus = styled.div`
  width: 10px;
  height: 2px;
  margin: 0 8px;
  background-color: ${COLORS.white};
`;

const StyledQuestionType = styled.div<QuestionTypeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 18px;
  color: ${COLORS.white};
  border-radius: 5px;
  width: 75px;
  padding: 8px 0;

  ${({ type }) =>
    type === "text" &&
    css`
      background-color: ${COLORS.yellow};
    `}

  ${({ type }) =>
    type === "note" &&
    css`
      background-color: ${COLORS.pink};
    `}
`;

const QuestionType = ({ type }: QuestionTypeProps) => {
  return (
    <StyledQuestionType type={type}>
      {type === "text" ? (
        <>
          <span>1</span>
          <Minus />
          <Icon icon="file-text" size={"18px"} />
        </>
      ) : (
        <>
          <span>2</span>
          <Minus />
          <Icon icon="star" size={"18px"} />
        </>
      )}
    </StyledQuestionType>
  );
};

export default QuestionType;
