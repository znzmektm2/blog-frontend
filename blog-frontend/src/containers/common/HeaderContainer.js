import React, { Component } from 'react';
import Header from 'components/common/Header';
import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class HeaderContainer extends Component {
  handleRemove = () => {
    const { BaseActions } = this.props;
    BaseActions.showModal('remove');
  }

  render() {
    const { handleRemove } = this;
    const { match, logged } = this.props;

    const { id } = match.params; // withRouter 를 사용하면 history, location, match 등을 사용할 수 있음
    
    return (
      <Header
        postId={id}
        logged={logged}
        onRemove={handleRemove}
      />
    );
  }
};

export default connect(
  (state) => ({
    logged: state.base.get('logged')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(HeaderContainer));