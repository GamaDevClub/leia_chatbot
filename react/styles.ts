import styled from 'styled-components';

export const PreBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10%;
  background: black;
  z-index: 997;
  opacity: 0.5;
`;

export const Block = styled.div`
  position: fixed;
  top: 10%;
  left: 0;
  width: 100%;
  height: 90%;
  background: black;
  z-index: 997;
  opacity: 0.5;
`;



export const BotContainer = styled.div`
  margin: 0;
  width: 400px;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 998;
  border-radius: 30px 0 0 0;
  box-shadow: -6px 5px 24px -10px rgba(0,0,0,0.75);
`;

export const BotHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 6px;
  background: #0f0f0f;
  margin: 0;
  color: #fff;
  border-radius: 30px 0 0 0;

  img {
    width: 50px;
    height: 50px;
    border-radius:50%;
  }

  p {
    margin-left: 16px;
  }

  strong {
    flex: 1;
    margin-left: 16px;
    font-size: 24px;
  }
`;

export const BotIframeStyle = styled.div`
  width: 350px;
  height: 300px;
  background: #fff;
`;