import { FC, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface ChatInputProps {
  channelId: string;
  channelName: string;
}

const ChatInput: FC<ChatInputProps> = ({ channelId, channelName }) => {
  const [message, setMessage] = useState('');
  const [user] = useAuthState(auth);
  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, `rooms/${channelId}/messages`), {
      message,
      user: user?.displayName,
      userImage: user?.photoURL,
      timestamp: serverTimestamp(),
    });
    setMessage('');
    console.log('Document written with ID: ', docRef.id);
  };

  return (
    <ChatInputContainer>
      <form onSubmit={handleSend}>
        <input
          type='text'
          placeholder={`Message ${channelName}`}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button type='submit'>Send</Button>
      </form>
    </ChatInputContainer>
  );
};

const ChatInputContainer = styled.div`
  > form {
    display: flex;
    justify-content: center;

    > input {
      position: fixed;
      bottom: 30px;
      width: 60%;
      border: 1px solid gray;
      border-radius: 5px;
      padding: 20px;
      outline: none;
    }

    > button {
      display: none;
    }
  }
`;

export default ChatInput;
