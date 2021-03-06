import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthActions from '~/store/ducks/auth';
import { Container, SignForm, Image } from '../styles';
import Button from '~/styles/components/Button';
import Logo from '~/assets/discord.png';

console.log('teste');
class SignIn extends Component {
  static propTypes = {
    signInRequest: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('teste');
    const { email, password } = this.state;
    const { signInRequest } = this.props;
    signInRequest(email, password);
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
          <Button size="big" onClick={this.handleSubmit} type="submit">Entrar</Button>
        </SignForm>
      </Container>
    );
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators(AuthActions, dispatch);
export default connect(null, mapDispatchToProps)(SignIn);
