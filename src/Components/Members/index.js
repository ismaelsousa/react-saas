import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { MembersList, Invite } from './styles';
import MembersActions from '~/store/ducks/members';
import Modal from '~/Components/Modal';
import Button from '~/styles/components/Button';
import api from '~/services/api';

class Members extends Component {
  static propTypes = {
    closeMembersModal: PropTypes.func.isRequired,
    getMembersRequest: PropTypes.func.isRequired,
    updateMemberRequest: PropTypes.func.isRequired,
    inviteMemberRequest: PropTypes.func.isRequired,
  }

  state = {
    roles: [],
    invite: '',

  }

  async componentDidMount() {
    const { getMembersRequest } = this.props;
    getMembersRequest();
    const response = await api.get('/roles');
    this.setState({ roles: response.data });
  }

  handleRolesChange(id, roles) {
    const { updateMemberRequest } = this.props;
    updateMemberRequest(id, roles);
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleInvite = (e) => {
    e.preventDefault();

    const { inviteMemberRequest } = this.props;
    const { invite } = this.state;
    inviteMemberRequest(invite);
  }

  render() {
    const { closeMembersModal, members } = this.props;
    const { roles, invite } = this.state;
    return (
      <Modal size="big">
        <h1>Membros</h1>

        <Invite
          onSubmit={this.handleInvite}

        >
          <input type="text" onChange={this.handleInputChange} name="invite" placeholder="Convidar para o time" value={invite} />
          <Button type="submit">Enviar</Button>
        </Invite>
        <form action="">
          <MembersList>

            {members.data.map((member) => (
              <li key={member.id}>
                <strong>{member.user.name}</strong>
                <Select
                  isMulti
                  options={roles}
                  value={member.roles}
                  getOptionLabel={(role) => role.name}
                  getOptionValue={(role) => role.id}
                  onChange={(value) => this.handleRolesChange(member.id, value)}
                />
              </li>
            ))}
          </MembersList>
          <Button onClick={closeMembersModal} filled={false} color="gray">CAncelar</Button>
        </form>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(MembersActions, dispatch);

const mapStateToProps = (state) => ({
  members: state.members,
});
export default connect(mapStateToProps, mapDispatchToProps)(Members);
