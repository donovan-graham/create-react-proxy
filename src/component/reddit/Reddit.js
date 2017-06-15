import React from 'react';
import PropTypes from 'prop-types';
import Picker from './Picker';
import Posts from './Posts';

const Reddit = ({
  selectedSubreddit,
  payload,
  isFetching,
  lastUpdated,
  fetchCacheKey,
  onInvalidateCache,
  onSelectSubreddit,
}) => (
  <div>
    <Picker
      value={selectedSubreddit}
      onChange={nextSubreddit => onSelectSubreddit(nextSubreddit)}
      options={['reactjs', 'frontend']}
    />
    <p>
      {lastUpdated &&
        <span>
          Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
          {' '}
        </span>}
      {!isFetching &&
        <button onClick={() => onInvalidateCache(fetchCacheKey)}>
          Refresh
        </button>}
    </p>

    {isFetching && payload.length === 0 && <h2>Loading...</h2>}
    {!isFetching && payload.length === 0 && <h2>Empty.</h2>}

    {payload.length > 0 &&
      <div style={{ opacity: isFetching ? 0.5 : 1 }}>
        <Posts posts={payload} />
      </div>}
  </div>
);

Reddit.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  payload: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
};

// Reddit.fetchService = (subreddit = 'reactjs') => {
//   return {
//     uri: `https://www.reddit.com/r/${subreddit}.json`,
//   };
// };

export default Reddit;
