import styled from "styled-components";

interface ContainerProps {
  width?: number;
}

const Container = styled.div<ContainerProps>`
  margin: 0 auto;
  width: ${({ width }) => width || 1330}px;
  max-width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
`;

export default Container;
