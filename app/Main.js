import React, { useState, useReducer } from 'react'
import { createRoot } from 'react-dom/client'
import { useImmerReducer } from 'use-immer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:8080'

import StateContext from './StateContext'
import DispatchContext from './DispatchContext'

// My Components
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import HomeGuest from './components/HomeGuest'
import About from './components/About'
import Terms from './components/Terms'
import CreatePost from './components/CreatePost'
import ViewSinglePost from './components/ViewSinglePost'
import FlashMessages from './components/FlashMessages'

const container = document.getElementById('app')
const root = createRoot(container)

function Main() {
	const initialState = {
		loggedIn: Boolean(localStorage.getItem('complexappToken')),
		flashMessages: [],
	}

	function ourReducer(draft, action) {
		switch (action.type) {
			case 'login':
				draft.loggedIn = true
				return
			case 'logout':
				draft.loggedIn = false
				return
			case 'flashMessage':
				draft.flashMessages.push(action.value)
				return
		}
	}
	const [state, dispatch] = useImmerReducer(ourReducer, initialState)

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<Router>
					<FlashMessages messages={state.flashMessages} />
					<Header />
					<Routes>
						<Route path='/' element={state.loggedIn ? <Home /> : <HomeGuest />} />
						<Route path='/about-us' element={<About />} />
						<Route path='/terms' element={<Terms />} />
						<Route path='/create-post' element={<CreatePost />} />
						<Route path='/post/:id' element={<ViewSinglePost />} />
					</Routes>
					<Footer />
				</Router>
			</DispatchContext.Provider>
		</StateContext.Provider>
	)
}

root.render(<Main tab='home' />)

if (module.hot) {
	module.hot.accept()
}
