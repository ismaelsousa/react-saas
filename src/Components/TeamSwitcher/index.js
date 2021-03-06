import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TeamsActions from 'store/ducks/teams';
import AuthActions from 'store/ducks/auth';
import Modal from '~/Components/Modal';
import Button from '~/styles/components/Button';
import {
  Container, TeamList, Team, NewTeam, Logout,
} from './styles';

class TeamSwitcher extends Component {
  static propTypes = {
    getTeamsRequest: PropTypes.func.isRequired,
    selectTeam: PropTypes.func.isRequired,
    openTeamModal: PropTypes.func.isRequired,
    closeTeamModal: PropTypes.func.isRequired,
    createTeamRequest: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    teams: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })),
    }).isRequired,
  }

  state = {
    newTeam: '',
  }

  componentDidMount() {
    const { getTeamsRequest } = this.props;

    getTeamsRequest();
  }

  handleSelectTeam = (team) => {
    const { selectTeam } = this.props;
    selectTeam(team);
  }

  handleCreateTeam = (e) => {
    e.preventDefault();
    const { createTeamRequest } = this.props;
    const { newTeam } = this.state;
    createTeamRequest(newTeam);
  }

  render() {
    const {
      teams, openTeamModal, closeTeamModal, signOut,
    } = this.props;
    const { newTeam } = this.state;

    return (
      <Container>
        <TeamList>
          {teams.data.map((team) => (
            <Team key={team.id} onClick={() => this.handleSelectTeam(team)}>
              <img
                src={`https://ui-avatars.com/api?font-size=0.33&background=7159c1&color=fff&name=${team.name}`}
                alt="imagem"
              />
            </Team>
          ))}

          <NewTeam onClick={openTeamModal}>Novo</NewTeam>

          {teams.teamModalOpen && (
            <Modal>
              <h1>Criar time</h1>
              <form onSubmit={this.handleCreateTeam}>

                <span>Nome</span>
                <input
                  type="text"
                  name="newTeam"
                  value={newTeam}
                  onChange={(e) => this.setState({ newTeam: e.target.value })}
                />
                <Button size="big" type="submit">SALVAR</Button>
                <Button size="small" onClick={closeTeamModal} color="gray">CANCELAR</Button>
              </form>
            </Modal>
          )}
        </TeamList>
        <Logout onClick={signOut}>SAIR</Logout>
      </Container>
    );
  }
}


const mapStateToProps = (state) => ({
  teams: state.teams,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...TeamsActions, ...AuthActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TeamSwitcher);
