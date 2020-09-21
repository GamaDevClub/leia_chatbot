import React, { useState, useCallback, useEffect } from 'react';
import Amplify, { Interactions } from 'aws-amplify';
import { ChatFeed, Message } from 'react-chat-ui';
import './Bot.css';

const API_KEY = 'us-west-2:7e9e1657-489b-4317-87f9-18bd5d52c888'; // Informe a chave cognito da Leia
//console.log(API_KEY);

const styles = {
  bubbleStyles: {
    text: {
      fontSize: 16,
    },
    chatbubble: {
      borderRadius: 30,
      padding: 10
    }
  },
  headerTitle: {
    color: 'white',
    fontSize: 22
  },
  header: {
    backgroundColor: 'rgb(0, 132, 255)',
    padding: 20,
    borderTop: '12px solid rgb(204, 204, 204)'
  },
  input: {
    fontSize: 16,
    padding: 10,
    outline: 'none',
    width: 350,
    border: 'none',
    borderBottom: '2px solid rgb(0, 132, 255)'
  }
}

Amplify.configure({
  Auth: {
    identityPoolId: API_KEY,
    region: 'us-west-2'
  },
  Interactions: {
    bots: {
      "leiabot_dev": {
        "name": "leiabot_dev",
        "alias": "$LATEST",
        "region": "us-west-2",
      },
    }
  }
});

interface IBotProps {
  productId: string;
}

const Bot: React.FC<IBotProps> = ({ productId }) => {

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    new Message({
      id: 1,
      message: "Olá, como posso ajudá-lo hoje?",
    })
  ])

  useEffect(() => {
    //Send product id to AWS

    try {
      Interactions.send("leiabot_dev", `id ${productId}`).then(response => { console.log(response) });
    }
    catch (e) {
      console.log("Erro")
    }

  }, [])

  const onChange = useCallback((e: any) => {
    const input_ = e.target.value
    setInput(input_)
  }, [])


  const submitMessage = useCallback(async (inputMessage: string) => {

    if (inputMessage !== '') {
      const message = new Message({
        id: 0,
        message: inputMessage,
      });
      let internMessages = [...messages, message]

      setMessages(internMessages)


      //Send message to AWS
      const response = await Interactions.send("leiabot_dev", inputMessage);
      console.log(response);

      const responseMessage = new Message({
        id: 1,
        message: response.message,
      });
      internMessages = [...internMessages, responseMessage];
      setMessages(internMessages);


      if (response.responseCard !== 'undefined') {

      }
    }
  }, [messages])

  const _handleKeyPress = useCallback((e: any) => {
    if (e.key === 'Enter') {
      submitMessage(input)
      setInput('')
    }
  }, [input, submitMessage])

  return (
    <div className="App">
      <header style={styles.header}>
        <p style={styles.headerTitle}>Bem-vindo ao seu bot Leia Wars!</p>
      </header>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        alignItems: 'center'
      }}>
        {/* <h2>{this.state.finalMessage}</h2> */}
        <ChatFeed
          messages={messages}
          hasInputField={false}
          bubbleStyles={styles.bubbleStyles}
        />

        <input
          onKeyDown={e => _handleKeyPress(e)}
          onChange={e => onChange(e)}
          style={styles.input}
          value={input}
        />
      </div>
    </div>
  );

}

export default Bot;