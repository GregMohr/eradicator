import React, { useState } from 'react';
import styled from 'styled-components';

import { Input, Button } from '../../../components';

export default function SignUp() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSignUp = async e => {
    e.preventDefault();
    console.log('handleSignUp', firstName, lastName, email, password);

    return await fetch('http://localhost:8080/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({firstName, lastName, email, password})
    })
      .then(data => data.json());
  }

  return (
    <ComponentContainer>
      <Input type="text" placeholder="First Name" onChange={e => setFirstName(e.target.value)} />
      <Input type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)} />
      <Input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <Input type="password" placeholder="Confirm Password" />
      <Button content="Sign Up" onClick={handleSignUp} />
    </ComponentContainer>
  )
}

const ComponentContainer = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  height: 90%;
  width: 26vw;
  min-width: 320px;
  border-radius: 10px;
  letter-spacing: .4rem;
`