import React, {useEffect} from 'react';
import Router, {useRouter} from 'next/router';
import AppLoader from '../../core/AppLoader';
import {useJWTAuthUser} from '../../utility/AuthHooks';

const withData = (ComposedComponent) => (props) => {
  const {user, isLoading} = useJWTAuthUser();
  const {asPath} = useRouter();
  const queryParams = asPath.split('?')[1];
  useEffect(() => {
    if (!user && !isLoading) {
      Router.push('/authlogin' + (queryParams ? '?' + queryParams : ''));
    }
  }, [user, isLoading]);
  if (!user || isLoading) return <AppLoader />;

  return <ComposedComponent {...props} />;
};
export default withData;
