import { FC } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CreateIcon from '@mui/icons-material/Create';
import styled from 'styled-components';
import SidebarOption from '../../sidebar-option/SidebarOption';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../../../firebase/firebase';
import { collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

interface SideBarProps {
  shown: boolean;
}
interface SidebarContainerProps {
  shown: boolean;
}

const SideBar: FC<SideBarProps> = ({ shown = true }) => {
  const [fetchedRooms] = useCollection(collection(db, 'rooms'));
  const [user] = useAuthState(auth);

  return (
    <SidebarContainer shown={shown}>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Slack</h2>
          <h3>
            <FiberManualRecordIcon />
            <span>{user?.displayName}</span>
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>

      {sidebarOptions.map(({ title, icon: Icon }, index) => (
        <SidebarOption icon={<Icon />} title={title} key={index} />
      ))}
      <hr />
      <SidebarOption icon={<ExpandMoreIconStyled />} title='Channels' />
      <hr />
      <SidebarOption
        icon={<AddIconStyled />}
        title='Add Channel'
        addChannelOption
      />
      {fetchedRooms &&
        fetchedRooms.docs.map((doc) => (
          <SidebarOption title={doc.data().name} key={doc.id} id={doc.id} />
        ))}
    </SidebarContainer>
  );
};

export default SideBar;
const SidebarContainer = styled.div<SidebarContainerProps>`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  max-width: 260px;
  min-width: 190px;
  border-top: 1px solid #49274b;
  margin-top: 0;
  overflow: auto;
  position: absolute;
  top: 0;
  z-index: 10;
  min-height: 100vh;
  left: ${(props) => (props.shown ? '0' : '-100%')};
  transition: all 250ms ease-in;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: gray;
  }
  > hr {
    margin: 10px 0;
    border: 1px solid #49274b;
  }
  @media (min-width: 37.5em) {
    position: initial;
    min-height: initial;
    margin-top: 60px;
  }
  &::before {
    content: '';
    /* display: ${(props) => (props.shown ? 'block' : 'none')}; */
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 190px;
    opacity: ${(props) => (props.shown ? '1' : '0')};
    z-index: -20;
    background-color: rgba(0, 0, 0, 0.7);
    transition: all 100ms ${(props) => (props.shown ? '250ms' : '0')};
    visibility: ${(props) => (props.shown ? 'visible' : 'hidden')};
    @media (min-width: 37.5em) {
      display: none;
    }
  }
`;
const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    height: 30px;
    width: 30px;
    background-color: white;
    border-radius: 18px;
  }
`;
const SidebarInfo = styled.div`
  h2 {
    font-size: 15px;
    //line-height: 0.8;
    margin-bottom: 5px;
    font-weight: 900;
  }

  h3 {
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 400;

    > .MuiSvgIcon-root {
      height: 15px;
      width: 15px;
      color: green;
      margin-top: 2px;
      margin-right: 3px;
    }
  }
`;

const sidebarOptions = [
  {
    title: 'Threads',
    icon: InsertCommentIcon,
  },
  {
    title: 'Mentions & reactions',
    icon: InboxIcon,
  },
  {
    title: 'Saved items',
    icon: DraftsIcon,
  },
  {
    title: 'Channel browser',
    icon: BookmarkBorderIcon,
  },
  {
    title: 'People & user groups',
    icon: PeopleAltIcon,
  },
  {
    title: 'Apps',
    icon: AppsIcon,
  },
  {
    title: 'File browser',
    icon: FileCopyIcon,
  },
  {
    title: 'Show less',
    icon: ExpandLessIcon,
  },
].map((option) => {
  option.icon = styled(option.icon)`
    //padding: 10px;
    &&& {
      width: 30px;
      height: 30px;
      margin-right: 8px;
    }
  `;
  return option;
});

type IconType = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
  muiName: string;
};

const iconFactory = (icon: IconType) => styled(icon)`
  //padding: 10px;
  &&& {
    width: 30px;
    height: 30px;
    margin-right: 8px;
  }
`;

const ExpandMoreIconStyled = iconFactory(ExpandMoreIcon);
const AddIconStyled = iconFactory(AddIcon);
