import React, {useEffect} from 'react';
import Router, {useRouter} from 'next/router';
import {JWTInitialUrl} from '../../../shared/constants/AppConst';
import AppLoader from '../../core/AppLoader';
import {useJWTAuthUser} from '../../utility/AuthHooks';

const withData = (ComposedComponent) => (props) => {
  const {user, isLoading} = useJWTAuthUser();
  const {asPath} = useRouter();
  const queryParams = asPath.split('?')[1];
  console.log('TTTEst', user, JWTInitialUrl);
  useEffect(() => {
    if (user) {
      Router.push(JWTInitialUrl + (queryParams ? '?' + queryParams : ''));
    }
  }, [user]);
  if (isLoading) return <AppLoader />;
  if (user) return <AppLoader />;

  return <ComposedComponent {...props} />;
};

export default withData;
