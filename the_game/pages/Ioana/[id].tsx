import React from 'react';
import { useRouter } from 'next/router';

const PageWithId = () => {
  const router = useRouter();

  const { id } = router.query;

  return <h1>Id-ul din URL este: {id}</h1>;
};
export default PageWithId;
