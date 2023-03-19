// components/RoutesList.js
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import {useEffect, useState} from 'react';

export function NewLink({href}) {
    return <div className={styles.grid}>
        <Link href={href}>
            <a className={styles.card}>
                <h1>{href}</h1>
            </a>
        </Link>
    </div>;
}

const RoutesList = () => {
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
                <NewLink key={index} href={route}/>
            ))}
        </ul>
    );
};
export default RoutesList;
