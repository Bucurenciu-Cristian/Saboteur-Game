import React from 'react';
import { useRouter } from 'next/router';

const PageWithId = () => {
  const router = useRouter();

  const { params } = router.query;
  console.log(params);
  return <h1>PARAMS din URL este: {params}</h1>;
};
export default PageWithId;
