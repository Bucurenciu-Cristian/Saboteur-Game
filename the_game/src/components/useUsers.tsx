import { useEffect, useState } from 'react';

const useUsers: () => any[] = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return users;
};
export default useUsers;
