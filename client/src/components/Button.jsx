import styled from 'styled-components';

export default function Button({content, onClick}) {
  return <StyledButton onClick={onClick}>{content}</StyledButton>
}

const StyledButton = styled.button `
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  letter-spacing: .2rem;
  width: 80%;
  height: 3rem;
  border: none;
  border-radius: 2rem;
  color: white;
  cursor: pointer;
`;