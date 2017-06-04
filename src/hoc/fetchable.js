import React from 'react';
import { connect } from 'react-redux';

import { requestData, invalidateData } from './actions';

// https://facebook.github.io/react/docs/higher-order-components.html
// https://facebook.github.io/react/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function fetchable(service, WrappedComponent) {
  class Fetchable extends React.Component {
    getService() {
      return typeof service === 'function' ? service(this.props) : service;
    }

    getServiceRequest() {
      return requestData(this.getService());
    }

    componentDidMount() {
      if (this.props.payload.length === 0) {
        this.props.dispatch(this.getServiceRequest());
      }
    }

    componentDidUpdate(prevProps) {
      const { didInvalidate, selectedSubreddit } = this.props;
      if (!!didInvalidate || (this.props.payload.length === 0 && selectedSubreddit !== prevProps.selectedSubreddit)) {
        this.props.dispatch(this.getServiceRequest());
      }
    }

    render() {
      // Filter out extra props that are specific to this HOC and shouldn't be
      // passed through
      // const { fetchAction, ...passThroughProps } = this.props;
      // Pass props to wrapped component
      return <WrappedComponent {...this.props} />;
    }
    // render() {
    //   // Wraps the input component in a container, without mutating it. Good!
    //   return <WrappedComponent {...this.props} />;
    // }
  }

  Fetchable.displayName = `Fetchable(${getDisplayName(WrappedComponent)})`;

  const mapStateToProps = service => (state, props) => {
    const fetchService = typeof service === 'function' ? service(props) : service;

    const fetchCacheKey = fetchService.uri;

    const { isFetching, payload, lastUpdated, didInvalidate } = state.datastore[fetchCacheKey] || {
      isFetching: true,
      payload: [],
    };

    return {
      payload,
      isFetching,
      didInvalidate,
      lastUpdated,
      fetchService,
      fetchCacheKey,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      onInvalidateCache: fetchService => dispatch(invalidateData(fetchService)),
    };
  };

  return connect(mapStateToProps(service), mapDispatchToProps)(Fetchable);
}

export default fetchable;
