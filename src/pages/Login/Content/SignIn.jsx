import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button, Remember } from '../../../components';


export default function SignIn() {
  // const [username, setUserName] = useState();
  // onChange={e => setUserName(e.target.value)}

  // const [password, setPassword] = useState();
  // onChange={e => setPassword(e.target.value)}
  return (
    <ComponentContainer>
      <InputContainer>
        <Input type="text" placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </InputContainer>
      <div className="rememberContainer">
        <Remember />
      </div>
      <div className="buttonContainer">
        <Button content="Login" />
      </div>
      <hr />
      {/* Demo User login buttons */}
    </ComponentContainer>
  )
}

const ComponentContainer = styled.div `
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
  flex-direction: column;
  height: 100%;
  width: 26vw;
  min-width: 320px;
  border-radius: 10px;
  letter-spacing: .4rem;
`

const InputContainer = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 30%;
  width: 100%;
`

const RememberContainer = styled.div `
  margin: .3rem 0 .2rem 0;
  width: 78%;
  display: flex;
`



