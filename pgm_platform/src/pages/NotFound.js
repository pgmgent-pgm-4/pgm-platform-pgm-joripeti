import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function NotFound() {
    const error = useRouteError();
    console.log(error);
  return (
    <div>
        <h1>errr...</h1>
        <p>Sorry, we vonden niet wat je zocht</p>
        <p>Dit vonden we wel:</p>
        <p>{error.status} - {error.statusText} - {error.message}</p>
    </div>
  )
}
