import React from "react";
import styled, { css } from "styled-components";
import { COLORS } from "../constants";
import { Rating as RatingTitle } from "../types/Rating";

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
  onChange?: (rating: RatingTitle) => any;
  value?: RatingTitle;
  readonly?: boolean;
}

const Rating = ({ onChange, value, readonly }: RatingProps) => {
  const ratings: RatingTitle[] = [1, 2, 3, 4, 5];

  return (
    <StyledRating>
      {ratings.map(rating => (
        <StyledButton
          onClick={() => onChange && onChange(rating)}
          key={rating}
          isSelected={value === rating}
          disabled={readonly !== undefined && readonly}
        >
          {rating}
        </StyledButton>
      ))}
    </StyledRating>
  );
};

export default Rating;
