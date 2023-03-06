import React, {useEffect, useState} from 'react';
import { app } from '../../config';

import {getFirestore,collection,onSnapshot,doc} from "@firebase/firestore";
import {useRouter} from "next/router";

const Firebase = () => {

  const [data, setData] = useState(null);
  const db = getFirestore(app);
  const PlayersCol = collection(db, "Players");
  const PlayerDoc = doc(PlayersCol, "DbEaczM41yEJQiHiPtL3");
  useEffect(() => {
    onSnapshot(PlayerDoc, (snapshot) => {
      console.log(data);
      const data1 = snapshot.data();
      setData(data1);
    });
  }, []);


  return (
    <div>
      <h1>{JSON.stringify(data)}</h1>
    </div>
  );
}

export default Firebase;
