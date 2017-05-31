import React from 'react';
import logProps from './logProps';

const Hello = props => {
  return (
    <div>
      {JSON.stringify(props)}
    </div>
  );
};

export default logProps(Hello);
