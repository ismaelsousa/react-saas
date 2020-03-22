import React, { Component } from 'react';

import { Container, SignForm, Image } from '../styles';
import Button from '~/styles/components/Button';
import Logo from '~/assets/discord.png';

export default class SignIn extends Component {
  state = {
    email: '',
    password: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

    // logar
  }

  render() {
    const { email, password } = this.state;
    return (
      <Container>
        <SignForm onSubmit={this.handleSubmit}>
          <Image src={Logo} alt="logo" />
          <h1>Boas vindas!</h1>
          <span>E-MAIL</span>
          <input type="email" name="email" onChange={this.handleInputChange} value={email} />
          <span>SENHA</span>
          <input type="password" name="password" onChange={this.handleInputChange} value={password} />
          <Button size="big" type="submit">Entrar</Button>
        </SignForm>
      </Container>
    );
  }
}
