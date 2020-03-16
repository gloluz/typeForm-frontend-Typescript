import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { COLORS } from "../constants";
import Icon, { Icons } from "../components/Icon";

export type Appearance = "fill" | "outline" | "text" | "bgWhite";
export type Color = keyof typeof COLORS;
export type Size = "small" | "big";

interface StyledButtonProps {
  appearance: Appearance;
  color: Color;
  size: Size;
  hasCenteredIcon?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  border-radius: 5px;
  padding: 0 16px;
  height: 50px;
  border: 1px solid transparent;
  font-family: "Averta", sans-serif;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.3s all ease;
  outline: none;

  &:disabled {
    opacity: 0.5;
    border: none;
    cursor: not-allowed;
    
  }

  ${({ hasCenteredIcon, size }) =>
    hasCenteredIcon &&
    size === "small" &&
    css`
      padding: 0;
      width: 40px;
      justify-content: center;
    `}

    ${({ hasCenteredIcon, size }) =>
      hasCenteredIcon &&
      size === "big" &&
      css`
        padding: 0;
        width: 50px;
        justify-content: center;
      `}

  ${({ size }) =>
    size === "small" &&
    css`
      font-size: 14px;
      height: 40px;
    `}

  ${({ color }) => css`
    &:focus {
      box-shadow: 0 0 0 1px ${COLORS[color]};
    }
  `};

  ${({ appearance, color }) =>
    appearance === "fill" &&
    css`
      background-color: ${COLORS[color]};
      border-color: ${COLORS[color]};
      color: ${COLORS.white};

      &:hover {
        background-color: transparent;
        border-color: ${COLORS[color]};
        color: ${COLORS[color]};
      }
    `}


  ${({ appearance, color }) =>
    appearance === "outline" &&
    css`
      background-color: transparent;
      border-color: ${COLORS[color]};
      color: ${COLORS[color]};

      &:hover {
        background-color: ${COLORS[color]};
        border-color: ${COLORS[color]};
        color: ${COLORS.white};
      }
    `}

  ${({ appearance, color }) =>
    appearance === "text" &&
    css`
      border-color: transparent;
      background: transparent;
      color: ${COLORS[color]};

      &:hover {
        border-color: ${COLORS[color]};
      }
    `}

  ${({ appearance, color }) =>
    appearance === "bgWhite" &&
    css`
      background: ${COLORS.white};
      color: ${COLORS[color]};

      &:hover {
        border-color: ${COLORS[color]};
      }
    `}
`;

export interface ButtonProps {
  children?: ReactNode | ReactNode[];
  appearance: Appearance;
  color: Color;
  size?: Size;
  iconSize?: string;
  iconBefore?: Icons;
  iconAfter?: Icons;
  iconCenter?: Icons;
  disabled?: boolean;
  onClick?: () => any;
  [k: string]: any;
}

const Button = ({
  children,
  appearance,
  color,
  iconAfter,
  iconCenter,
  iconBefore,
  onClick,
  size,
  iconSize,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      appearance={appearance}
      color={color}
      onClick={onClick}
      disabled={disabled}
      hasCenteredIcon={iconCenter !== undefined}
      size={size || "big"}
      {...props}
    >
      {iconBefore && (
        <Icon
          icon={iconBefore}
          size={iconSize || "18px"}
          style={{ marginRight: 8, marginLeft: -2 }}
        />
      )}
      {iconCenter && (
        <Icon
          icon={iconCenter}
          size={iconSize || "18px"}
          style={{ marginRight: -2, marginLeft: -2 }}
        />
      )}
      {children}
      {iconAfter && (
        <Icon
          icon={iconAfter}
          size={iconSize || "18px"}
          style={{ marginLeft: 8, marginRight: -2 }}
        />
      )}
    </StyledButton>
  );
};

export default Button;
