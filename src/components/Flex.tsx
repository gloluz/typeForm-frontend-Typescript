import styled from "styled-components";

export interface FlexProps {
  justify?:
    | "flex-start"
    | "space-between"
    | "space-around"
    | "flex-end"
    | "center";
  align?: "flex-start" | "center" | "flex-end";
  direction?: "row" | "column" | "row-reverse" | "column-revers";
  wrap?: boolean;
}

const Flex = styled.div<FlexProps>`
  display: flex;
  justify-content: ${({ justify }) => justify || "flex-start"};
  align-items: ${({ align }) => align || "flex-start"};
  flex-direction: ${({ direction }) => direction || "row"};
  flex-wrap: ${({ wrap }) => (wrap ? "wrap" : "nowrap")};
`;

export default Flex;
