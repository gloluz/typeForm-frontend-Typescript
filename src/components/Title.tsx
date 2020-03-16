import React, { ReactNode } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";

const H1 = styled.h1`
  font-family: "Averta", sans-serif;
  font-size: 36px;
  font-weight: bold;
  color: ${COLORS.black};
`;

const H2 = styled.h2`
  font-family: "Averta", sans-serif;
  font-size: 22px;
  font-weight: bold;
  color: ${COLORS.black};
`;

const H3 = styled.h2`
  font-family: "Averta", sans-serif;
  font-size: 26px;
  font-weight: bold;
  color: ${COLORS.black};
`;

export interface TitleProps {
  children: ReactNode;
  level: 1 | 2 | 3;
  [k: string]: any;
}

const Title = ({ children, level, ...props }: TitleProps) => {
  return (
    <>
      {level === 1 && <H1 {...props}>{children}</H1>}
      {level === 2 && <H2 {...props}>{children}</H2>}
      {level === 3 && <H3 {...props}>{children}</H3>}
    </>
  );
};

export default Title;
