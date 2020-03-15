import React from "react";
import styled from "styled-components";

import { GlobalStyles } from "./styles";
import Button from "./components/Button";
import Title from "./components/Title";
import Box from "./components/Box";
import Flex from "./components/Flex";
import Container from "./components/Container";
import Rating from "./components/Rating";
import QuestionType from "./components/QuestionType";
import QuestionBox from "./components/QuestionBox";
import Icon from "./components/Icon";
import { COLORS } from "./constants";
import { ReactComponent as Logo } from "../src/assets/Logo.svg";

const Header = styled.header`
  height: 100px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${COLORS.silver};
  display: flex;
  align-items: center;
`;

const BoxText = styled.h2`
  color: ${COLORS.white};
  font-size: 22px;
  margin-top: 10px;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Header>
        <Container>
          <Logo />
        </Container>
      </Header>

      <Container width={1190}>
        <Flex>
          <Box color="blue">
            <Flex
              direction="column"
              justify="center"
              align="center"
              style={{ height: "100%" }}
            >
              <Icon icon="add" size="45px" color={COLORS.white} />
              <BoxText>Nouveau formulaire</BoxText>
            </Flex>
          </Box>
          <QuestionBox question="Votre avis sur l'évènement du 10 février" />
          <QuestionBox question="Votre avis sur l'évènement du 10 février" />
        </Flex>
      </Container>
    </>
  );
};

export default App;
