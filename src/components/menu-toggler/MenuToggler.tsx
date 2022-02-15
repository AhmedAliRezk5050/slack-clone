import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import { FC } from 'react';

interface MenuTogglerProps {
  toggle: () => void;
}

const MenuToggler: FC<MenuTogglerProps> = ({ toggle }) => {
  return (
    <TogglerButton onClick={toggle}>
      <MenuIcon />
    </TogglerButton>
  );
};

const TogglerButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c9c4c4;
  position: fixed;
  right: 20px;
  border: none;
  border-radius: 50%;
  top: 200px;
  background-color: var(--slack-color);
  width: 50px;
  height: 50px;
  z-index: 999;
  cursor: pointer;
  @media (min-width: 37.5em) {
    display: none;
  }
`;
export default MenuToggler;
