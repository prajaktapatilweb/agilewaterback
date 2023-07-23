import React from 'react';
import AppPage from '../@crema/hoc/JWTDefaultPage/index';
import asyncComponent from '../@crema/utility/asyncComponent';

const AuthLogin = asyncComponent(() => import('../modules/auth/Login/index'));
export default AppPage(() => <AuthLogin />);
