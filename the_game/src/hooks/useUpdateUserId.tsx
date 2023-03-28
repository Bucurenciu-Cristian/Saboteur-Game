import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/Slices/authSlice';

const useUpdateUserId = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    if (typeof window !== 'undefined' && userId === null) {
      const storedUserId = localStorage.getItem('userId');

      if (storedUserId) {
        dispatch(login({ userId: JSON.parse(storedUserId) })); // Pass an object with a userId property
      }
    }
  }, [dispatch, userId]);
};

export default useUpdateUserId;
