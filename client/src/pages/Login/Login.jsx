import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import background from './background.jpeg';
import { SignIn, SignUp } from './Content';

// handle situations where the component unmounts before a Promise resolves
// Check out the tutorial How To Call Web APIs with the useEffect Hook in React for more information.
// animate component switch with a sort of popping or bubbling in and out of the elements
export default function Login({ setToken }){
  const [ activeTab, setActiveTab ] = useState("tab1");
  const handleSignIn = () => setActiveTab("tab1");
  const handleSignUp = () => setActiveTab("tab2");

  return (
    <ComponentContainer>
      <MainContainer>
        <H2>WELCOME</H2>
        <ToggleContainer>
          <Button onClick={handleSignIn} className={activeTab === "tab1" ? "left active" : "left"}>Sign In</Button>
          <Button onClick={handleSignUp} className={activeTab === "tab2" ? "right active" : "right"}>Sign Up</Button>
        </ToggleContainer>
        <ContentContainer>
          { activeTab === "tab1" ? <SignIn setToken={setToken} /> : <SignUp /> }
        </ContentContainer>
      </MainContainer>
    </ComponentContainer>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

// Styled Components
const ComponentContainer = styled.div `
  background-image: url(${background});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const MainContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 80vh;
  width: 30vw;
  min-width: 320px;
  background: rgba(255, 255, 255, .15);
  border-radius: 10px;
  backdrop-filter: blur(8.5px);
  color: #ffffff;
  letter-spacing: .4rem;
`;

const H2 = styled.h2 `
  margin: 2rem 0 3rem 0;
`;

const ToggleContainer = styled.div `
  padding: .4rem;
  margin-bottom: 1rem;
  width: 80%;
  max-height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, .15);
  border: 1px solid gray;
  border-radius: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, .37);
  font-weight: bold;
  letter-spacing: .15rem;
`;

const Button = styled.a `
  width: 50%;
  height: 100%;
  text-decoration: none;
  color: #03217b;
  display: flex;
  justify-content: center;
  align-items: center;
  &.left {
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
    border-right: 1px solid white;
  }
  &.right {
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
    border-left: 1px solid white;
  }
  &.active {
    backdrop-filter: blur(15rem);
    box-shadow: 0 0 0 0.2rem #b9abe0;

  }
  &:hover {
    backdrop-filter: blur(12rem);
  }
`;

const ContentContainer = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  margin-top: .5rem;
`;
