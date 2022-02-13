import styled from "styled-components";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";

const Login = () => {
  const handleLogin = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2111/2111615.png"
          alt=""
        />
        <h1>Sign in to the PAPA FAM</h1>
        <p>papa.slack.com</p>
        <Button onClick={handleLogin}>Sign in with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  background: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;
const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    width: 100px;
    object-fit: contain;
    margin-bottom: 40px;
  }

  > p {
    margin-bottom: 50px;
  }

  > button {
    text-transform: inherit;
    background: #0a8d48;
    color: white;

    :hover {
      background: #08542c;
    }
  }
`;

export default Login;
