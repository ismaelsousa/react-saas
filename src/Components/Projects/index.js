import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container, Project } from './styles';
import Button from '~/styles/components/Button';

const Projects = ({ activeTeam }) => {
  if (!activeTeam) return null;
  return (
    <Container>
      <header>
        <h1>{activeTeam.name}</h1>
        <div>
          <Button onClick={() => {}}>+ Novo</Button>
          <Button onClick={() => {}}>Membros</Button>
        </div>
      </header>
      <Project>
        <p>Aplicado</p>
      </Project>
      <Project>
        <p>Aplicado</p>
      </Project>
      <Project>
        <p>Aplicado</p>
      </Project>
    </Container>
  );
};


Projects.propTypes = {
  activeTeam: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const mapStateToProps = (state) => ({
  activeTeam: state.teams.active,
});

export default connect(mapStateToProps)(Projects);
