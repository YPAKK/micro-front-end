import React, { lazy, Suspense, useState, useEffect } from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import { createBrowserHistory } from 'history'

const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))
const DashboardLazy = lazy(() => import('./components/DashboardApp'))
import Progress from './components/Progress'
import Header from './components/Header'

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
})

const history = createBrowserHistory()

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard')
    }
  }, [isSignedIn])

  return (
    <div>
      <Router history={history}>
        <StylesProvider generateClassName={generateClassName}>
          <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazy />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </StylesProvider>
      </Router>
    </div>
  )
}
