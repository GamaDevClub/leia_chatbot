import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`;

export const ChatFeedContainer = styled.div`
  flex: 1 1 auto;
  overflow: auto;
`;

export const InputMessageContainer = styled.div`
  display: flex;
  flex: 0 1 40px;
  width: 100%;
  height: 40px;
  border-top: 1px solid #d6d6d6;

  input {
    font-size: 16;
    flex: 1;
    border: 0;
    outline: none !important;
    padding: 8px;
  }

  button {
    outline: none !important;
    border: 0;
    background: white;
  }
`;


