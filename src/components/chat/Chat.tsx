import styled from 'styled-components';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ChatInput from '../chat-input/ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { FC, useEffect, useRef } from 'react';
import Message from '../mesage/Message';

interface ChatProps {
  roomId: string;
}

const Chat: FC<ChatProps> = ({ roomId }) => {
  const scrollChatToBottomRef = useRef<HTMLDivElement>(null);
  const [fetchedRoom, fetchedRoomLoading, fetchedRoomError] = useDocument(
    doc(db, 'rooms', roomId),
  );

  // useCollection(collection(db, `rooms/${roomId}/messages`));
  const [fetchedMessages, fetchedMessagesLoading, fetchedMessagesError] =
    useCollection(
      query(
        collection(db, `rooms/${roomId}/messages`),
        orderBy('timestamp', 'asc'),
      ),
    );

  useEffect(() => {
    scrollChatToBottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [fetchedMessages]);

  const renderContent = () => {
    const fetchRoomData = fetchedRoom?.data();
    if (fetchedRoomLoading && !fetchedRoomError) {
      return <h1>Loading...</h1>;
    } else if (!fetchedRoomLoading && fetchedRoomError) {
      return <h1>error</h1>;
    } else if (
      !fetchedRoomLoading &&
      !fetchedRoomError &&
      fetchedRoom &&
      fetchRoomData
    ) {
      const fetchRoomId = fetchedRoom.id;
      const { name: fetchedRoomName } = fetchRoomData;
      return (
        <>
          <Header>
            <HeaderLeft>
              <h3>{fetchedRoomName}</h3>
              <StarBorderIcon />
            </HeaderLeft>
            <HeaderRight>
              <InfoOutlinedIcon />
              <span>Details</span>
            </HeaderRight>
          </Header>
          <ChatMessages>{renderMessages()}</ChatMessages>
          <ChatInput channelId={fetchRoomId} channelName={fetchedRoomName} />
          <ScrollChatToBottom ref={scrollChatToBottomRef} />
        </>
      );
    } else {
      return null;
    }
  };
  const renderMessages = () => {
    if (fetchedMessagesLoading && !fetchedMessagesError) {
      return <span>Loading...</span>;
    } else if (!fetchedMessagesLoading && fetchedMessagesError) {
      return <span>error</span>;
    } else if (
      !fetchedMessagesLoading &&
      !fetchedMessagesError &&
      fetchedMessages
    ) {
      return fetchedMessages.docs.map((doc) => {
        const { message, timestamp, user, userImage } = doc.data();
        return (
          <Message
            key={doc.id}
            message={message}
            timestamp={timestamp ? timestamp.toDate().toUTCString() : ''}
            user={user}
            userImage={userImage}
          />
        );
      });
    } else {
      return null;
    }
  };

  return <ChatContainer>{renderContent()}</ChatContainer>;
};

export default Chat;

const ChatContainer = styled.div`
  margin-top: 142px;
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  padding-bottom: 150px;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 20px;
  }
  @media (min-width: 28.125em) {
    margin-top: 60px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h3 {
    text-transform: lowercase;
    margin-right: 7px;
  }
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;

  > span {
    margin-left: 7px;
  }
`;
const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const ScrollChatToBottom = styled.div``;
