import styled from 'styled-components';
import { Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/firebase';
import { signOut } from 'firebase/auth';
const Header = () => {
  const [user] = useAuthState(auth);
  let photoURL: string | undefined;
  let displayName: string | undefined;
  if (user && user.photoURL && user.displayName) {
    photoURL = user.photoURL;
    displayName = user.displayName;
  }
  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar
          src={photoURL}
          alt={displayName}
          onClick={() => signOut(auth)}
        />
        <AccessTimeIcon />
      </HeaderLeft>
      <HeaderSearch>
        <SearchIcon />
        <input type='text' placeholder='Search SLACK' />
      </HeaderSearch>
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: var(--slack-color);
  color: white;
  @media (min-width: 28.125em) {
    flex-direction: row;
    gap: initial;
  }
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  gap: 1rem;
  @media (min-width: 28.125em) {
    gap: initial;
  }
  // direct descendant only
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;
const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #421f44;
  color: gray;
  border: 1px solid gray;
  border-radius: 6px;

  > input {
    background: transparent;
    border: none;
    outline: none;
    flex: 0.8;
    text-align: center;
    color: white;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  justify-content: flex-end;
`;
