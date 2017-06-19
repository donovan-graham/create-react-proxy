import React from 'react';
import PropTypes from 'prop-types';

const Details = ({ isToggled, handleToggle, name, email }) => {
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
        {!isToggled && <button onClick={handleToggle}> Show more </button>}
        {isToggled && <button onClick={handleToggle}> Show less </button>}
      </div>
    </div>
  );
};

Details.propTypes = {
  isToggled: PropTypes.bool,
  handleToggle: PropTypes.func,
  name: PropTypes.string,
  email: PropTypes.string,
};

export default Details;
