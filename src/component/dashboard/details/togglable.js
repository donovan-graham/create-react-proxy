import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function togglable(WrappedComponent, isToggled = false) {
  class Togglable extends React.Component {
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
  }

  Togglable.displayName = `Togglable(${getDisplayName(WrappedComponent)})`;
  hoistNonReactStatic(Togglable, WrappedComponent);

  return Togglable;
}

export default togglable;
