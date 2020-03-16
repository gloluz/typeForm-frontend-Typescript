import React from "react";
import styled, { css } from "styled-components";
import { COLORS } from "../constants";

type Rating = 1 | 2 | 3 | 4 | 5;

const StyledRating = styled.div`
  width: 390px;
  height: 70px;
  border: 1px solid ${COLORS.darkBlue};
  border-radius: 10px;
  overflow: hidden;
`;

interface StyledButtonProps {
  isSelected: boolean;
  disabled: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  height: 100%;
  width: 20%;
  font-family: "Averta", sans-serif;
  color: ${COLORS.darkBlue};
  font-size: 24px;
  background: none;
  border: none;
  border-right: 1px solid ${COLORS.darkBlue};
  transition: 0.3s all ease;
  outline: none;

  &:disabled {
    color: ${COLORS.darkBlue};
  }

  &:last-child {
    border-right: none;
  }

  ${({ disabled }) =>
    !disabled &&
    css`
      cursor: pointer;

      &:hover {
        background-color: ${COLORS.pink};
      }
    `}

  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: ${COLORS.pink};
    `}
`;

export interface RatingProps {
  onChange?: (rating: Rating) => any;
  value?: Rating;
}

const Rating = ({ onChange, value }: RatingProps) => {
  const ratings: Rating[] = [1, 2, 3, 4, 5];

  return (
    <StyledRating>
      {ratings.map(rating => (
        <StyledButton
          onClick={() => onChange && onChange(rating)}
          key={rating}
          isSelected={value === rating}
          disabled={value !== undefined}
        >
          {rating}
        </StyledButton>
      ))}
    </StyledRating>
  );
};

export default Rating;
