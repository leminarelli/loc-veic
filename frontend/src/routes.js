import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NewCar from './pages/NewCar'
import CarRent from './pages/CarRent'

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/cars/new" component={NewCar} />
				<Route path="/cars/rent" component={CarRent} />
			</Switch>
		</BrowserRouter>
	)
}
