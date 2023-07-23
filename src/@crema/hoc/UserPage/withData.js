import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { initialUrl } from '../../../shared/constants/AppConst';
import AppLoader from '../../core/AppLoader';
import { useAuthUser } from '../../utility/AuthHooks';

const withData = (ComposedComponent) => (props) => {
  const { user, isLoading } = useAuthUser();
  const { asPath } = useRouter();
  const queryParams = asPath.split('?')[1];
  console.log('sfsdf', asPath, queryParams, initialUrl)
  // useEffect(() => {
  //   if (user) {
  //     Router.push(initialUrl + (queryParams ? '?' + queryParams : ''));
  //   }
  // }, [user]);
  // if (isLoading) return <AppLoader />;
  // if (user) return <AppLoader />;
  if (isLoading) return <AppLoader />
  return <ComposedComponent {...props} />;
};

export default withData;
