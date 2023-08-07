import { Button, Stack } from '@mui/material';
import { ConnectionState } from '../../components/ConnectionState';
import { Events } from '../../components/Events';
import { MyForm } from '../../components/MyForm';
import { getUserProfile } from '../../hooks/getUserProfile';
import { useState } from 'react';
import { socket } from '../../socket';

export default function Chatroom({ fooEvents }: { fooEvents: any }) {
  const { data, error, isLoading } = getUserProfile();
  const [text, setText] = useState<string | undefined>();
  const [joinRoom, setJoinRoom] = useState<string | undefined>();

  const [value, setValue] = useState('');

  function onSubmit(event: any) {
    event.preventDefault();
    socket.emit('send_message', {
      username: data?.username,
      message: value,
      room: joinRoom,
    });
  }

  function onJoinRoom() {
    socket.emit('join_room', text);
    setJoinRoom(text);
  }

  return (
    <Stack>
      {!joinRoom ? (
        <form onSubmit={onJoinRoom}>
          <input onChange={(e) => setText(e.target.value)} />
          <button type="submit">Join Room</button>
        </form>
      ) : (
        <Stack>
          <Events events={fooEvents} />
          <MyForm setValue={setValue} onSubmit={onSubmit} />

          <Button
            variant="contained"
            onClick={() => {
              setJoinRoom('');
            }}
          >
            Out Room
          </Button>
        </Stack>
      )}

      <Button
        sx={{ marginTop: 1 }}
        variant="contained"
        onClick={() => {
          localStorage.removeItem('token');
          window.location.reload();
        }}
      >
        Log Out
      </Button>
    </Stack>
  );
}
