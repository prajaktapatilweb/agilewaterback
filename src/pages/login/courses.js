import React from 'react';
import AppPage from '@crema/hoc/AppPage/index';
import asyncComponent from '@crema/utility/asyncComponent';

const SignIn = asyncComponent(() =>
  import('../../modules/Login/Courses/index'),
);
export default AppPage(() => <SignIn />);
