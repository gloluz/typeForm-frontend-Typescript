import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { GlobalStyles } from "./styles";
import Container from "./components/Container";
import { COLORS } from "./constants";
import { ReactComponent as Logo } from "../src/assets/Logo.svg";
import Home from "./containers/Home";
import CreateForm from "./containers/CreateForm";
import AnswerForm from "./containers/AnswerForm";

const Header = styled.header`
  height: 100px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${COLORS.silver};
  display: flex;
  align-items: center;
`;

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header>
        <Container>
          <Logo />
        </Container>
      </Header>

      <Switch>
        <Route path="/form/answer">
          <AnswerForm />
        </Route>

        <Route path="/form/create">
          <CreateForm />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
