import { FC } from 'react';
import styled from 'styled-components';

interface MessageProps {
  message: string;
  timestamp: string;
  user: string;
  userImage: string;
}

const Message: FC<MessageProps> = ({ message, timestamp, user, userImage }) => {
  return (
    <MessageContainer>
      <img src={userImage} alt='' />
      <MessageInfo>
        <h4>
          <span>{user}</span>
          <span>{timestamp}</span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  > img {
    height: 50px;
    width: 50px;
    border-radius: 8px;
    object-fit: contain;
  }
`;
const MessageInfo = styled.div`
  > h4 {
    > span + span {
      color: gray;
      font-weight: 300;
      margin-left: 5px;
      font-size: 10px;
    }
  }
`;
export default Message;
