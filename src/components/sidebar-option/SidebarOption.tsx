import styled from "styled-components";
import { ReactNode, FC } from "react";
import { addRoom } from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { enterRoom } from "../../redux/rooms-slice";
import { useAppDispatch } from "../../hooks/redux-hooks";

interface SidebarOptionProps {
  id?: string;
  icon?: ReactNode;
  title: string;
  addChannelOption?: boolean;
}

const SidebarOption: FC<SidebarOptionProps> = ({
  icon,
  title,
  addChannelOption = false,
  id,
}) => {
  const dispatch = useAppDispatch();
  const addChannel = async () => {
    const channelName = prompt("Please enter the channel name");
    if (channelName && channelName.trim()) {
      addRoom(channelName);
    }
  };

  const selectChannel = () => {
    if (id) {
      dispatch(enterRoom(id));
    }
  };
  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {icon ? (
        <>
          {icon}
          <h3>{title}</h3>
        </>
      ) : (
        <SidebarOptionChannel>
          <span>#</span>
          <span>{title}</span>
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
};

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  //justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  margin: 5px 0;
  font-size: 14px;
  cursor: pointer;

  > h3 {
    font-size: 12px;
    //white-space: nowrap;
    font-weight: 500;
  }

  :hover {
    opacity: 0.9;
    background: #340e36;
  }
`;

const SidebarOptionChannel = styled.div`
  font-size: 16px;

  span {
    padding: 0 3px;
    font-weight: 500;
    //white-space: nowrap;
  }
`;
