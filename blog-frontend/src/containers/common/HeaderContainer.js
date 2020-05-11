import React, { Component } from 'react';
import Header from 'components/common/Header';
import { withRouter } from 'react-router-dom';

class HeaderContainer extends Component {
  handleRemove = () => {

  }

  render() {
    const { handleRemove } = this;
    const { match } = this.props;

    const { id } = match.params; // withRouter 를 사용하면 history, location, match 등을 사용할 수 있음
    
    return (
      <Header
        postId={id}
        onRemove={handleRemove}
      />
    );
  }
};


export default withRouter(HeaderContainer);