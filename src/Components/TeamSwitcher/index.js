import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TeamsActions from 'store/ducks/teams';
import Modal from '~/Components/Modal';
import Button from '~/styles/components/Button';
import {
  Container, TeamList, Team, NewTeam,
} from './styles';

class TeamSwitcher extends Component {
  static propTypes = {
    getTeamsRequest: PropTypes.func.isRequired,
    selectTeam: PropTypes.func.isRequired,
    openTeamModal: PropTypes.func.isRequired,
    closeTeamModal: PropTypes.func.isRequired,
    teams: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })),
    }).isRequired,
  }

  componentDidMount() {
    const { getTeamsRequest } = this.props;

    getTeamsRequest();
  }

  handleSelectTeam = (team) => {
    const { selectTeam } = this.props;
    selectTeam(team);
  }

  render() {
    const { teams, openTeamModal, closeTeamModal } = this.props;
    console.log(teams);
    return (
      <Container>
        <TeamList>
          {teams.data.map((team) => (
            <Team key={team.id} onClick={() => this.handleSelectTeam(team)}>
              <img src={`https://ui-avatars.com/api?font-size=0.33&background=7159c1&color=fff&name=${team.name}`} alt="imagem" />
            </Team>
          ))}

          <NewTeam onClick={openTeamModal}>Novo</NewTeam>

          {teams.teamModalOpen && (
            <Modal>
              <h1>Criar time</h1>
              <form onSubmit={() => {}}>

                <span>Nome</span>
                <input type="text" name="newTeam" />
                <Button size="big" type="submit">Salvar</Button>
                <Button size="small" onClick={closeTeamModal} color="gray">Cancelar</Button>
              </form>
            </Modal>
          )}
        </TeamList>
      </Container>
    );
  }
}


const mapStateToProps = (state) => ({
  teams: state.teams,
});
const mapDispatchToProps = (dispatch) => bindActionCreators(TeamsActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TeamSwitcher);
