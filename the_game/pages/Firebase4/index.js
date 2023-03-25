import { addDoc, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import React, { useState, useEffect } from 'react';
import { getFirebase } from '../../firebase';

const FirestoreCollection = () => {
  const { firestore } = getFirebase();
  const [messages, setMessages] = useState([]);

  const [value, loading, error] = useCollection(collection(firestore, 'messages'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [message, setMessage] = useState('');

  const handleAddMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      return;
    }

    await addDoc(collection(firestore, 'messages'), {
      text: message.trim(),
      createdAt: new Date(),
    });

    setMessage('');
  };

  useEffect(() => {
    if (value) {
      setMessages(value.docs.map((doc) => doc.data().text));
    }
  }, [value]);

  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {messages.length > 0 && (
          <span>
            Collection: <br />
            {messages.map((text) => (
              <div key={text}>{JSON.stringify(text)}</div>
            ))}
          </span>
        )}
      </p>
      <form onSubmit={handleAddMessage}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Add Message</button>
      </form>
    </div>
  );
};

export default FirestoreCollection;
