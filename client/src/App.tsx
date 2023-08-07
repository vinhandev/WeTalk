import { useState, useEffect } from 'react';
import { socket } from './socket';
import { Button, Stack } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chatroom from './pages/Chatroom';
import Authorization from './pages/Authorization';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<any>([]);

  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
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

  const queryClient = new QueryClient();

  const token = localStorage.getItem('token');

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        {isConnected ? (
          <Stack>
            {/* <Button onClick={disconnect}>Disconnect</Button> */}
            <BrowserRouter>
              <Routes>
                {token !== null ? (
                  <Route
                    path="/"
                    element={<Chatroom fooEvents={fooEvents} />}
                  />
                ) : (
                  <Route path="/" element={<Authorization />} />
                )}
              </Routes>
            </BrowserRouter>
          </Stack>
        ) : (
          <Button onClick={connect}>Connect</Button>
        )}
      </Stack>
    </QueryClientProvider>
  );
}
