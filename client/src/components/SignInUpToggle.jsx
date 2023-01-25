import { useState } from 'react';
import styled from 'styled-components';

export default function SignInUpToggle() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <ToggleContainer>
      <Button className={activeTab === "tab1" ? "left active" : "left"}>Sign In</Button>
      <Button className={activeTab === "tab2" ? "right active" : "right"}>Sign Up</Button>
    </ToggleContainer>
  )
}

const ToggleContainer = styled.div `
  padding: .4rem;
  margin-bottom: 1rem;
  width: 70%;
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, .15);
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
  }
  &:hover {
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
  }
`;