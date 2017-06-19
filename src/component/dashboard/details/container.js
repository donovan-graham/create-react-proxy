import React, { Component } from 'react';
import Details from './component';

class ToggledDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggled: false };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState(prev => ({ isToggled: !prev.isToggled }));
    // this.setState((prevState, props) => {
    //   return {counter: prevState.counter + props.step};
    // });
  }

  render() {
    return (
      <Details isToggled={this.state.isToggled} handleToggle={this.handleToggle} name={'Bob'} email={'bob@wevel.com'} />
    );
  }
}

export default ToggledDetails;
