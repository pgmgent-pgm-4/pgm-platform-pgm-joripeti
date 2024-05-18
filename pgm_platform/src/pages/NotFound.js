import { Alert } from '@mui/material';
import React from 'react'
import { useRouteError } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';

export default function NotFound() {
    const theme = useTheme();
    const error = useRouteError();
    console.log(error);
  return (
    <div className='error' style={{color: theme.palette.error}}>
        <h1>errr...</h1>
        <p>Sorry, we vonden niet wat je zocht</p>
        <p>Dit vonden we wel:</p>
        <Alert severity='error'>{error.status} - {error.statusText} - {error.message}</Alert>
    </div>
  )
}
