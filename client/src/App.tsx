import React, { useState, useEffect } from 'react';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { MyForm } from './components/MyForm';
import { socket } from './socket';
import { Events } from './components/Events';
import { Button } from '@mui/material';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<any>([]);
  const [joinRoom, setJoinRoom] = useState<{
    name: string;
    room: string;
    time: Date;
  }>();

  function onJoinRoom() {
    socket.emit('join_room', '123');
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  useEffect(() => {
    function onFooEvent(value: any) {
      console.log(value);

      setFooEvents((previous: any) => [...previous, value]);
    }

    socket.on('receive_message', onFooEvent);

    return () => {
      socket.off('receive_message', onFooEvent);
    };
  }, [socket, fooEvents]);

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <Events events={fooEvents} />
      <Button onClick={onJoinRoom}>Join Room</Button>
      <ConnectionManager />
      <MyForm />
    </div>
  );
}
