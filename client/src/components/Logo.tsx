import { Box, Stack, Typography } from '@mui/material';
import logo from '../assets/logo_1.png';

export default function Logo() {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Box
        component="img"
        src={logo}
        sx={{
          height: '30px',
          width: '30px',
          objectFit: 'contain',
        }}
      />
      <Typography
        sx={{
          marginLeft: 1,
          fontFamily: 'Dosis',
          fontSize: '30px',
          fontWeight:'bold'
        }}
      >
        WETALK
      </Typography>
    </Stack>
  );
}
