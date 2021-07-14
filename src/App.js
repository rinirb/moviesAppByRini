import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'

import Home from './components/Home'

import PopularMovies from './components/PopularMovies'

import SpecificMovie from './components/SpecificMovie'

import ProtectedRoute from './components/ProtectedRoute'

import Account from './components/Account'

import LostYourWay from './components/LostYourWay'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={PopularMovies} />
    <ProtectedRoute exact path="/movie/:id" component={SpecificMovie} />
    <ProtectedRoute exact path="/account" component={Account} />
    <Route exact path="/lost-your-way" component={LostYourWay} />
    <Redirect to="/lost-your-way" />
  </Switch>
)

export default App
