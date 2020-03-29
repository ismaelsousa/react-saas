import React, { Component } from 'react';


import { Container } from './styles';

import TeamSwitcher from '~/Components/TeamSwitcher';
import Projects from '~/Components/Projects';

class Main extends Component {
  render() {
    return (
      <Container>
        <TeamSwitcher />
        <Projects />
      </Container>
    );
  }
}

export default Main;
