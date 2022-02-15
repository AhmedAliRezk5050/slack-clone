import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/header/Header';
import styled from 'styled-components';
import Sidebar from './components/layout/sidebar/Sidebar';
import Chat from './components/chat/Chat';
import { useAppSelector } from './hooks/redux-hooks';
import { selectRooId } from './redux/rooms-slice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase';
import Login from './components/login/Login';
import { CircularProgress } from '@mui/material';
import MenuToggler from './components/menu-toggler/MenuToggler';

function App() {
  const roomId = useAppSelector(selectRooId);
  const [user, loading, error] = useAuthState(auth);
  const [sideBarVisible, setSideBarVisible] = useState(true);
  if (loading) {
    return (
      <AppLoading>
        <img
          src='https://cdn-icons-png.flaticon.com/512/2111/2111615.png'
          alt=''
        />
        <CircularProgress color='secondary' />
      </AppLoading>
    );
  }

  return (
    <div className='App'>
      {user ? (
        <>
          <Header />
          <AppBody>
            <Sidebar shown={sideBarVisible} />
            <Routes>
              <Route
                path='/'
                element={<>{roomId && <Chat roomId={roomId} />}</>}
              />
            </Routes>
            <MenuToggler
              toggle={() => {
                setSideBarVisible((prevState) => !prevState);
              }}
            />
          </AppBody>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 30px;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  > img {
    width: 100px;
    object-fit: contain;
  }
`;
