import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';

export function ShowLinks() {
  const router = useRouter();

  function clearAuthData() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    router.push('/auth/login');
  }

  return (
    <Container>
      <Row>
        <Button variant="primary" onClick={clearAuthData}>
          Logout
        </Button>
        {/* <NewLink href="/Table" /> */}
        {/* <NewLink href="/cardsList" /> */}
        {/* <NewLink href="/Socket" /> */}
      </Row>
    </Container>
  );
}
