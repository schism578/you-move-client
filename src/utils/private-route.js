import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../services/token-service'

export default function PrivateRoute({ component, children, ...props }) {
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenService.hasAuthToken()
          ? [ children ]
          : <Redirect
            to={{
              pathname: '/login',
              state: { from: componentProps.location }
            }}
          />
      )}
    />
  )
}