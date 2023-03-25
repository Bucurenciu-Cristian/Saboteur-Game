import { useEffect, useState } from 'react';
import { getFirebase } from '../../firebase';
import 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { firestore } = getFirebase();

  const messagesRef = collection(firestore, 'messages');
  const [messagesData] = useCollectionData(messagesRef);

  useEffect(() => {
    setMessages(messagesData);
  }, [messagesData]);

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    messagesRef?.add({
      text: inputValue,
      createdAt: new Date(),
    });
    setInputValue('');
  };

  return (
    <div>
      <h1>Real-time Chat App</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={inputValue} onChange={handleInputValueChange} />
        <button type="submit">Send</button>
      </form>
      <ul>{messages?.length > 0 && messages.map((message) => <li key={message.id}>{message.text}</li>)}</ul>
    </div>
  );
}

export default App;
