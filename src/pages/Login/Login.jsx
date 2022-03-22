import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SignIn, SignUp } from './Content';
import './Login.css'

// can I make the toggle happen by just animating field changes between the two forms
// the hide/unhide would be animated with a sort of popping or bubbling in and out

async function loginUser(credentials){
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(credentials)
  })
    .then(data => data.json());
}


//{setToken}
export default function Login(){
  const [ activeTab, setActiveTab ] = useState("tab1");
  const handleSignIn = () => setActiveTab("tab1");
  const handleSignUp = () => setActiveTab("tab2");

  return (
    <div className="loginBackground">
      <div className="mainContainer">
        <h2>WELCOME</h2>
        <ToggleContainer>
          <Button onClick={handleSignIn} className={activeTab === "tab1" ? "left active" : "left"}>Sign In</Button>
          <Button onClick={handleSignUp} className={activeTab === "tab2" ? "right active" : "right"}>Sign Up</Button>
        </ToggleContainer>
        <ContentContainer>
          { activeTab === "tab1" ? <SignIn /> : <SignUp /> }
        </ContentContainer>
      </div>
    </div> 
  )
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// }

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
`
