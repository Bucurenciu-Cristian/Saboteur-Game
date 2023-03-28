// withAuth.js
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import useUpdateUserId from '../hooks/useUpdateUserId';

const withAuth = (WrappedComponent) =>
  function (props) {
    const router = useRouter();
    useUpdateUserId();
    const userId = useSelector((state) => state.auth.userId);
    useEffect(() => {
      // Check if the user is authenticated
      if (!userId) {
        router.replace('/auth/login');
      }
    }, []);

    // If the user is authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  };

export default withAuth;
