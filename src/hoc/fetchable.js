import React from 'react';
import { connect } from 'react-redux';

import { generateFetchCacheKey } from './utils';


import { requestData, invalidateData } from './actions';

// https://facebook.github.io/react/docs/higher-order-components.html
// https://facebook.github.io/react/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function fetchable(service, WrappedComponent, LoadingComponent, EmptyComponent) {
  class Fetchable extends React.Component {
    componentDidMount() {
      const {payload, onFetchRequest, fetchCacheKey, fetchService} = this.props;
      if (payload.length === 0) {
        onFetchRequest(fetchCacheKey, fetchService);
      }
    }

    componentDidUpdate(prevProps) {
      const { didInvalidate, selectedSubreddit, payload, onFetchRequest, fetchCacheKey, fetchService } = this.props;
      if (!!didInvalidate || (payload.length === 0 && selectedSubreddit !== prevProps.selectedSubreddit)) {
        onFetchRequest(fetchCacheKey, fetchService);
      }
    }

    render() {
      const { isFetching, payload } = this.props;


      // need to check length and isEmpty
      if (isFetching && payload.length === 0) {
        if (LoadingComponent === undefined) {
          return <h2>Default loader ...</h2>;
        } 
        if (LoadingComponent !== null) {
          // custom loader
          return <LoadingComponent {...this.props} />;
        }
        // status handled by WrappedComponent  LoadingComponent === null
      }


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
    /* get the props to create the service */
    const fetchService = typeof service === 'function' ? service(props) : service;
   
    const fetchCacheKey = generateFetchCacheKey(fetchService);

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
      onInvalidateCache: fetchCacheKey => dispatch(invalidateData(fetchCacheKey)),
      onFetchRequest: (fetchCacheKey, fetchService) => dispatch(requestData(fetchCacheKey, fetchService)),
    };
  };

  return connect(mapStateToProps(service), mapDispatchToProps)(Fetchable);
}

export default fetchable;
