import React from 'react'
import styled from 'styled-components';

import { Input, Button } from '../../../components';

export default function SignUp() {
  return (
    <ComponentContainer>
      <Input type="text" placeholder="First Name"></Input>
      <Input type="text" placeholder="Last Name"></Input>
      <Input type="text" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="password" placeholder="Confirm Password"></Input>
      <Button content="Submit" />
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