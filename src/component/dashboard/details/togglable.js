import React, { Component } from 'react';
import Details from './component';

function togglable(WrappedComponent, isToggled = false) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isToggled };
      this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
      this.setState(prevState => ({ isToggled: !prevState.isToggled }));
    }

    render() {
      return <WrappedComponent {...this.props} isToggled={this.state.isToggled} handleToggle={this.handleToggle} />;
    }
  };
}

export default togglable;
