import styled from 'styled-components';

export default function Remember() {
  return (
    <ComponentContainer>
      <CheckboxContainer>      
        <StyledInput id="remember" type="checkbox"/>
        <StyledLabel htmlFor="remember">Remember Me</StyledLabel>
      </CheckboxContainer>
      <StyledLink href="#">Forgot Password</StyledLink>
    </ComponentContainer>
  )
}

const ComponentContainer = styled.div `
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CheckboxContainer = styled.div `
  display: flex;
  justify-content: left;
`;

const StyledInput = styled.input `
  cursor: pointer;
`;

const StyledLabel = styled.label `
  font-size: 70%;
  letter-spacing: .1rem;
  padding-left: .3rem;
  color: white;
`;

const StyledLink = styled.a `
  font-size: 70%;
  letter-spacing: .1rem;
  text-decoration: none;
  color: white;
`;