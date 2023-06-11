import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with your server URL

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Event listener for receiving new chat messages
    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      // Emit the chat message event to the server
      socket.emit('chat message', newMessage);

      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
