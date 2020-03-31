/* eslint-disable react/static-property-placement */
/* eslint-disable import/extensions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectsActions from '~/store/ducks/projects';
import MembersActions from '~/store/ducks/members';

import { Container, Project } from './styles';
import Button from '~/styles/components/Button';
import Modal from '~/Components/Modal';
import Members from '~/Components/Members';

class Projects extends Component {
  static propTypes ={
    activeTeam: PropTypes.shape({
      name: PropTypes.string,
    }),
    openMembersModal: PropTypes.func.isRequired,
    getProjectsRequest: PropTypes.func.isRequired,
    createProjectRequest: PropTypes.func.isRequired,
    closeProjectModal: PropTypes.func.isRequired,
    openProjectModal: PropTypes.func.isRequired,
    projects: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      })),
      projectModalOpen: PropTypes.bool.isRequired,
    }).isRequired,
    members: PropTypes.shape({
      membersModalOpen: PropTypes.bool,
    }),
  }

  static defaultProps ={
    activeTeam: null,
  }

  state ={
    newProject: '',
  }

  componentDidMount() {
    const { getProjectsRequest, activeTeam } = this.props;

    if (activeTeam) {
      getProjectsRequest();
    }
  }


  handleCreateProject = (e) => {
    e.preventDefault();
    const { createProjectRequest } = this.props;
    const { newProject } = this.state;
    createProjectRequest(newProject);
  }

  render() {
    const {
      activeTeam, projects, closeProjectModal, openProjectModal, openMembersModal, members,
    } = this.props;

    const { newProject } = this.state;
    if (!activeTeam) return null;
    return (
      <Container>
        <header>
          <h1>{activeTeam.name}</h1>
          <div>
            <Button onClick={openProjectModal}>+ Novo</Button>
            <Button onClick={openMembersModal}>Membros</Button>
          </div>
        </header>

        {projects.data.map((project) => (
          <Project key={project.id}>
            <p>{project.title}</p>
          </Project>
        ))}

        {projects.projectModalOpen && (
        <Modal>
          <h1>Criar projeto</h1>
          <form onSubmit={this.handleCreateProject}>
            <span>NOME</span>
            <input
              type="text"
              value={newProject}
              onChange={(e) => this.setState({ newProject: e.target.value })}
              name="newProject"
            />
            <Button type="submit" size="big" onClick={() => {}}>Criar</Button>
            <Button color="gray" onClick={closeProjectModal}>Cancelar</Button>
          </form>
        </Modal>
        )}
        {members.membersModalOpen && (<Members />)}
      </Container>
    );
  }
}


const mapStateToProps = (state) => ({
  activeTeam: state.teams.active,
  projects: state.projects,
  members: state.members,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...ProjectsActions, ...MembersActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
