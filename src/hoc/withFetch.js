import React from 'react';

// https://facebook.github.io/react/docs/higher-order-components.html
// https://facebook.github.io/react/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withFetch(WrappedComponent) {
  class Fetch extends React.Component {
    componentWillMount() {
      console.log('componentWillMount');
    }

    shouldComponentUpdate() {
      console.log('ShouldComponentUpdate');
    }

    componentWillReceiveProps(nextProps) {
      console.log('ComponentWillRecieveProps');
    }

    componentWillUpdate() {
      console.log('ComponentWillUpdate');
    }

    componentDidUpdate() {
      console.log('ComponentDidUpdate');
    }

    componentWillUnmount() {
      console.log('componentWillUnmount');
    }

    render() {
      // Filter out extra props that are specific to this HOC and shouldn't be
      // passed through
      const { url, ...passThroughProps } = this.props;
      console.log('url', url);

      // Pass props to wrapped component
      return <WrappedComponent {...passThroughProps} />;
    }
    // render() {
    //   // Wraps the input component in a container, without mutating it. Good!
    //   return <WrappedComponent {...this.props} />;
    // }
  }

  Fetch.displayName = `withFetch(${getDisplayName(WrappedComponent)})`;

  return Fetch;
}

export default withFetch;
