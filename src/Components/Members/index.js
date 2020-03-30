import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { MembersList } from './styles';
import MembersActions from '~/store/ducks/members';
import Modal from '~/Components/Modal';
import Button from '~/styles/components/Button';

class Members extends Component {
  static propTypes = {
    closeMembersModal: PropTypes.func.isRequired,
    getMembersRequest: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { getMembersRequest } = this.props;
    getMembersRequest();
  }

  render() {
    const { closeMembersModal, members } = this.props;
    return (
      <Modal size="big">
        <h1>Membros</h1>
        <form action="">
          <MembersList>

            {members.data.map((member) => (
              <li key={member.id}>
                <strong>{member.user.name}</strong>
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
