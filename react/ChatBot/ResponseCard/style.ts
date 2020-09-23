import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-width: 300px;
  margin: 0 auto;
  align-items: center;

  button {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border-style: none;
    border: solid 1px #d6d6d6;
    margin: 2px;
    outline: none;
    box-shadow: -5px 5px 6px 0px rgba(0,0,0,0.17);
  }
`;

export const Card = styled.div`
  width: 80%;
  max-width: 350px;
  padding: 6px;
  border-radius: 4px;
  border: solid 1px #d6d6d6;
  margin: 0 auto;
  box-shadow: -5px 5px 6px 0px rgba(0,0,0,0.17);

  img {
    width: 100%;
  }

  h4 {
    margin: 8px 0px;
    text-align: center;
    display: inline-block;
    font-size: 12px;
  }

  p {
    margin: 8px 0px;
    text-align: center;
    display: inline-block;
    font-size: 12px;
  }

  a {
    margin: 8px auto;
    padding: 16px;
    display: block;
    width: 50%;
    background: blue;
    color: white;
    border-radius: 4px;
    text-decoration: none;
    text-align: center;
  }
`;
