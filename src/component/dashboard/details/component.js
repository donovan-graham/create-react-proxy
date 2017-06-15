import React from 'react';
import PropTypes from 'prop-types';

const Details = ({ isToggled, onToggle, name, email }) => {
  const styled = {
    display: isToggled ? 'block' : 'none',
  };

  return (
    <div>
      <div>
        Name: {name}
      </div>
      <div style={styled}>
        Email: {email}
      </div>
      <div>
        {!isToggled && <button onClick={onToggle}> Show more </button>}
        {isToggled && <button onClick={onToggle}> Show less </button>}
      </div>
    </div>
  );
};

Details.propTypes = {
  isToggled: PropTypes.bool,
  onToggle: PropTypes.func,
  name: PropTypes.string,
  email: PropTypes.string,
};

export default Details;
