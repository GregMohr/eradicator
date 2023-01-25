import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Input, Button, Remember } from '../../../components';

async function signInUser(credentials){
  console.log(credentials);
  return fetch('http://localhost:8080/signin', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(credentials)
  })
    .then(data => data.json());
}

export default function SignIn({setToken}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSignIn = async e => {
    e.preventDefault();
    console.log(email, password);
    const token = await signInUser({email, password});
    setToken(token);
    console.log(token);
  }
  // Do I need a value property on the below inputs?
  // Add format/constraint validation for email and password
  return (
    <ComponentContainer>
      <InputContainer>
        <Input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      </InputContainer>
      <RememberContainer>
        <Remember />
      </RememberContainer>
      <ButtonContainer>
        <Button content="Sign In" onClick={handleSignIn} />
      </ButtonContainer>
      <HR />
      {/* Demo User login buttons */}
    </ComponentContainer>
  )
}

SignIn.propTypes = {
  setToken: PropTypes.func.isRequired
}

// Styled components
const ComponentContainer = styled.div `
  display: flex;
  align-items: center;
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

const ButtonContainer = styled.div `
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HR = styled.hr `
  width: 70%;
`
