import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { NewLink } from '../src/components/RoutesList';

export function ShowLinks() {
  const router = useRouter();

  function clearAuthData() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    router.push('/auth/login');
  }

  return (
    <>
      <NewLink href="/auth/login" />
      <NewLink href="/" />
      {/* <NewLink href="/auth/register" /> */}
      <NewLink href="/Lobby" />
      {/* <NewLink href="/game" /> */}
      <Button onClick={clearAuthData}>Logout</Button>
      {/* <NewLink href="/Table" /> */}
      {/* <NewLink href="/cardsList" /> */}
      {/* <NewLink href="/Socket" /> */}
    </>
  );
}
