import React from "react";
import styled from "styled-components";

import Container from "../components/Container";
import Flex from "../components/Flex";
import Box from "../components/Box";
import Icon from "../components/Icon";
import QuestionBox from "../components/QuestionBox";
import { COLORS } from "../constants";
import Title from "../components/Title";
import { Link } from "react-router-dom";

const BoxText = styled.h2`
  color: ${COLORS.white};
  font-size: 22px;
  margin-top: 10px;
`;

const Home = () => {
  return (
    <Container width={1190}>
      <Title level={1} style={{ marginTop: 90, marginBottom: 20 }}>
        Mes formulaires
      </Title>
      <Flex>
        <Box color="blue">
          <Link to="/form/create" style={{ textDecoration: "none" }}>
            <Flex
              direction="column"
              justify="center"
              align="center"
              style={{ height: "100%" }}
            >
              <Icon icon="add" size="45px" color="white" />
              <BoxText>Nouveau formulaire</BoxText>
            </Flex>
          </Link>
        </Box>
        <QuestionBox question="Votre avis sur l'évènement du 10 février" />
        <QuestionBox question="Votre avis sur l'évènement du 10 février" />
      </Flex>
    </Container>
  );
};

export default Home;
