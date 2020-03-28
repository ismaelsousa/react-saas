import React, { Component } from 'react';


import { Container } from './styles';

import TeamSwitcher from '~/Components/TeamSwitcher';

class Main extends Component {
  render() {
    return (
      <Container>
        <TeamSwitcher />
      </Container>
    );
  }
}

export default Main;
