import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthActions from '~/store/ducks/auth';
import { Container, SignForm, Image } from '../styles';
import Button from '~/styles/components/Button';
import Logo from '~/assets/discord.png';

console.log('teste');
class SignUp extends Component {
  static propTypes = {
    signUpRequest: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
    name: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const { signUpRequest } = this.props;
    signUpRequest(name, email, password);
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { email, password, name } = this.state;
    return (
      <Container>
        <SignForm onSubmit={this.handleSubmit}>
          <Image src={Logo} alt="logo" />
          <h1>Criar conta!</h1>
          <span>NAME</span>
          <input type="text" name="name" onChange={this.handleInputChange} value={name} />
          <span>E-MAIL</span>
          <input type="email" name="email" onChange={this.handleInputChange} value={email} />
          <span>SENHA</span>
          <input type="password" name="password" onChange={this.handleInputChange} value={password} />
          <Button size="big" onClick={this.handleSubmit} type="submit">Entrar</Button>
        </SignForm>
      </Container>
    );
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators(AuthActions, dispatch);
export default connect(null, mapDispatchToProps)(SignUp);
