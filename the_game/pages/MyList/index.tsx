import React from 'react';

interface Person {
  id: string;
  name: string;
  email: string;
  address?: {
    street: string;
    city: string;
  }
}

interface GetPeopleResponse {
  page: number;
  people: Person[];
  lastUrl: string;
  nextUrl: string;
}

const Page: React.FC<{
  list: Person[];
  onClick: (person: Person) => void
}> = ({list, onClick}) => (
  <div></div>
);

export default Page;
