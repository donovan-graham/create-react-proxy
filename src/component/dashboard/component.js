import React from 'react';

import Details from './details/component';
import ToggledDetails from './details/container';
import togglable from './details/togglable';

const TogglableDetails = togglable(Details);

const Dashboard = () => {
  return (
    <div>
      <TogglableDetails name={'Dill'} email={'dill@pickel.com'} />
      <TogglableDetails name={'Dill'} email={'dill@pickel.com'} />
      <ToggledDetails />
      <ToggledDetails />
    </div>
  );
};

export default Dashboard;
