// components/RoutesList.js
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';

export function NewLink({ href }) {
  return (
    <div className={styles.grid}>
      <Link href={href}>
        <a className={styles.card}>{href}</a>
      </Link>
    </div>
  );
}

function RoutesList() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetch('/api/list-routes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching routes');
        }
        return response.json();
      })
      .then((data) => {
        setRoutes(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <ul>
      {routes.map((route, index) => (
        <NewLink key={index} href={route} />
      ))}
    </ul>
  );
}

export default RoutesList;
