import React from 'react'
import { Container } from './style'

export interface IMessage {
  bubbleStyle?: object;
  text: string;
}

const BlogMessage: React.FC<IMessage> = ({ bubbleStyle, text }) => {

  return (
    <Container style={bubbleStyle}>
      <p>{text}</p>
    </Container>
  )
}

export default BlogMessage