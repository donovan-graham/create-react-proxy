import React from 'react';
import { connect } from 'react-redux';

import { invalidateData } from './actions';

// https://facebook.github.io/react/docs/higher-order-components.html
// https://facebook.github.io/react/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function mapStateToProps(state, props) {
  const { isFetching, lastUpdated, didInvalidate, items: posts } = state.datastore[props.selectedSubreddit] || {
    isFetching: true,
    items: [],
  };

  return {
    posts,
    isFetching,
    didInvalidate,
    lastUpdated,
    fetchInvalidate: invalidateData(props.selectedSubreddit),
  };
}

function fetchable(WrappedComponent) {
  class Fetchable extends React.Component {
    componentDidMount() {
      const { dispatch, fetchAction } = this.props;
      dispatch(fetchAction);
    }

    componentDidUpdate(prevProps) {
      const { didInvalidate, selectedSubreddit } = this.props;
      if (!!didInvalidate || selectedSubreddit !== prevProps.selectedSubreddit) {
        const { dispatch, fetchAction } = this.props;
        dispatch(fetchAction);
      }
    }

    render() {
      // Filter out extra props that are specific to this HOC and shouldn't be
      // passed through
      const { fetchAction, ...passThroughProps } = this.props;
      console.log('url', fetchAction);

      // Pass props to wrapped component
      return <WrappedComponent {...passThroughProps} />;
    }
    // render() {
    //   // Wraps the input component in a container, without mutating it. Good!
    //   return <WrappedComponent {...this.props} />;
    // }
  }

  Fetchable.displayName = `Fetchable(${getDisplayName(WrappedComponent)})`;

  return connect(mapStateToProps)(Fetchable);
}

export default fetchable;
