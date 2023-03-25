import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/Slices/authSlice';

const useUpdateUserId = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    if (typeof window !== 'undefined' && userId === null) {
      const storedUserId = localStorage.getItem('userId');

      if (storedUserId) {
        dispatch(login(JSON.parse(storedUserId)));
      }
    }
  }, [dispatch, userId]);
};

export default useUpdateUserId;
